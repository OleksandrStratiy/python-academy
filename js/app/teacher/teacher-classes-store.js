window.App = window.App || {};

window.App.teacherClassesStore = (function () {
  "use strict";

  function create(deps) {
    const { supa } = deps;

    async function getCurrentUserId() {
      if (!supa) return null;
      const { data: { user } } = await supa.auth.getUser();
      return user?.id || null;
    }

    function normalizeClassRow(row) {
      return {
        code: row.code,
        name: row.name || row.code,
        school_name: row.school_name || "",
        show_class_in_global: !!row.show_class_in_global,
        show_school_in_global: !!row.show_school_in_global,
        show_school_in_class: !!row.show_school_in_class,
        module_access: row.module_access || {},
        task_access: row.task_access || {}
      };
    }

    function generateClassCode() {
      const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
      const prefix =
        letters[Math.floor(Math.random() * letters.length)] +
        letters[Math.floor(Math.random() * letters.length)];
      const numbers = Math.floor(100 + Math.random() * 900);
      return `${prefix}-${numbers}`;
    }

    async function fetchTeacherClasses(existingClasses = []) {
      if (!supa) return [];
      const userId = await getCurrentUserId();
      if (!userId) return [];

      const { data, error } = await supa
        .from("classes")
        .select("code, name, school_name, show_class_in_global, show_school_in_global, show_school_in_class, module_access, task_access")
        .eq("teacher_id", userId)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return (data || []).map(normalizeClassRow);
    }

    async function createClassRecord(payload, existingClasses = []) {
      const userId = await getCurrentUserId();
      if (!userId || !supa) throw new Error("Teacher not found");

      let code = generateClassCode();
      while (existingClasses.some(c => c.code === code)) {
        code = generateClassCode();
      }

      const { data, error } = await supa
        .from("classes")
        .insert({
          code,
          name: payload.name,
          school_name: payload.schoolName || null,
          teacher_id: userId,
          show_class_in_global: !!payload.showClassInGlobal,
          show_school_in_global: !!payload.showSchoolInGlobal,
          show_school_in_class: !!payload.showSchoolInClass,
          updated_at: new Date().toISOString(),
          module_access: {},
          task_access: {}
        })
        .select("code, name, school_name, show_class_in_global, show_school_in_global, show_school_in_class, module_access, task_access")
        .single();

      if (error) throw error;
      return normalizeClassRow(data);
    }

    async function updateClassRecord(code, patch) {
      const userId = await getCurrentUserId();
      if (!userId || !supa) throw new Error("Teacher not found");

      const { error } = await supa
        .from("classes")
        .update({ ...patch, updated_at: new Date().toISOString() })
        .eq("code", code)
        .eq("teacher_id", userId);

      if (error) throw error;
    }

    async function deleteClassRecord(code) {
      const userId = await getCurrentUserId();
      if (!userId || !supa) throw new Error("Teacher not found");

      const { error } = await supa
        .from("classes")
        .delete()
        .eq("code", code)
        .eq("teacher_id", userId);

      if (error) throw error;
    }

    async function fetchStudents(classCode) {
      if (!supa) return [];

      const { data, error } = await supa
        .from("profiles")
        .select("id, full_name, progress, updated_at, class_code, role")
        .eq("role", "student")
        .eq("class_code", classCode);

      if (error) throw error;
      return data || [];
    }

    async function saveStudentProgress(studentId, progress) {
      if (!supa) throw new Error("Supabase unavailable");

      const { error } = await supa
        .from("profiles")
        .update({
          progress,
          updated_at: new Date().toISOString()
        })
        .eq("id", studentId);

      if (error) throw error;
    }

    return {
      getCurrentUserId,
      normalizeClassRow,
      fetchTeacherClasses,
      createClassRecord,
      updateClassRecord,
      deleteClassRecord,
      fetchStudents,
      saveStudentProgress
    };
  }

  return { create };
})();