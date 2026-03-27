window.App = window.App || {};

window.App.teacherAssignmentStore = (function () {
  "use strict";

  function create(deps) {
    const { supa } = deps;
let cachedUserId = null;
let cachedUserIdPromise = null;
    async function getCurrentUserId() {
  if (!supa) return null;

  if (cachedUserId) {
    return cachedUserId;
  }

  if (cachedUserIdPromise) {
    return cachedUserIdPromise;
  }

  cachedUserIdPromise = (async () => {
    const {
      data: { user },
      error
    } = await supa.auth.getUser();

    if (error) throw error;

    cachedUserId = user?.id || null;
    cachedUserIdPromise = null;
    return cachedUserId;
  })();

  try {
    return await cachedUserIdPromise;
  } catch (err) {
    cachedUserIdPromise = null;
    throw err;
  }
}

    function normalizeTaskRow(row) {
      return {
        id: row.id,
        title: row.title || "Без назви",
        description: row.description || "",
        source: row.source || "teacher",
        solution_format: row.solution_format || "text",
starter_code: row.starter_code || "",
max_score: Number(row.max_score || 12),
        subject: row.subject || "",
        category: row.category || "",
        difficulty: row.difficulty || "",
        author_id: row.author_id || null,
        is_public: !!row.is_public,
        is_active: row.is_active !== false,
        created_at: row.created_at || null,
        updated_at: row.updated_at || null
      };
    }

    function normalizeAssignmentRow(row) {
      return {
        id: row.id,
        task_bank_id: row.task_bank_id,
        teacher_id: row.teacher_id,
        target_type: row.target_type || "class",
        class_code: row.class_code || "",
        student_id: row.student_id || null,
        title_snapshot: row.title_snapshot || "Без назви",
        description_snapshot: row.description_snapshot || "",
solution_format_snapshot: row.solution_format_snapshot || "text",
max_score_snapshot: Number(row.max_score_snapshot || 12),
        note_for_student: row.note_for_student || "",
        due_at: row.due_at || null,
        status: row.status || "active",
        allow_late_submission: row.allow_late_submission !== false,
        created_at: row.created_at || null,
        updated_at: row.updated_at || null
      };
    }

    async function fetchTeacherClasses() {
      if (!supa) return [];
      const userId = await getCurrentUserId();
      if (!userId) return [];

      const { data, error } = await supa
        .from("classes")
        .select("code, name")
        .eq("teacher_id", userId)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return data || [];
    }

    async function fetchStudentsByClass(classCode) {
      if (!supa || !classCode) return [];

      const { data, error } = await supa
        .from("profiles")
        .select("id, full_name, class_code, role")
        .eq("role", "student")
        .eq("class_code", classCode)
        .order("full_name", { ascending: true });

      if (error) throw error;
      return data || [];
    }

    async function fetchTaskBank() {
      if (!supa) return [];
      const userId = await getCurrentUserId();
      if (!userId) return [];

      const { data, error } = await supa
        .from("task_bank")
        .select("*")
        .or(`author_id.eq.${userId},is_public.eq.true`)
        .eq("is_active", true)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return (data || []).map(normalizeTaskRow);
    }

    async function createTaskBankItem(payload) {
      if (!supa) throw new Error("Supabase не підключено");
      const userId = await getCurrentUserId();
      if (!userId) throw new Error("Користувача не знайдено");

const row = {
  title: String(payload.title || "").trim(),
  description: String(payload.description || "").trim(),
  source: payload.source || "teacher",
  solution_format: payload.solutionFormat || "text",
  starter_code: payload.starterCode || "",
  max_score: Math.max(1, Number(payload.maxScore || 12)),
  subject: payload.subject || "",
  category: payload.category || "",
  difficulty: payload.difficulty || "",
  author_id: userId,
  is_public: !!payload.isPublic,
  is_active: true,
  updated_at: new Date().toISOString()
};

      if (!row.title) throw new Error("Укажи назву завдання");
      if (!row.description) throw new Error("Укажи умову завдання");



      const { data, error } = await supa
        .from("task_bank")
        .insert(row)
        .select("*")
        .single();

      if (error) throw error;
      return normalizeTaskRow(data);
    }
async function archiveTaskBankItem(taskId) {
  if (!supa) throw new Error("Supabase не підключено");
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("Користувача не знайдено");
  if (!taskId) throw new Error("Не знайдено завдання для видалення");

  const { data, error } = await supa
    .from("task_bank")
    .update({
      is_active: false,
      updated_at: new Date().toISOString()
    })
    .eq("id", taskId)
    .eq("author_id", userId)
    .select("id")
    .single();

  if (error) throw error;
  if (!data) throw new Error("Не вдалося видалити завдання");

  return true;
}
    async function fetchAssignments() {
      if (!supa) return [];
      const userId = await getCurrentUserId();
      if (!userId) return [];

      const { data, error } = await supa
        .from("assignments")
        .select("*")
        .eq("teacher_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []).map(normalizeAssignmentRow);
    }
    async function fetchAssignmentsForStudent(studentId, classCode) {
  if (!supa) return [];
  const userId = await getCurrentUserId();
  if (!userId) return [];
  if (!studentId || !classCode) return [];

  const { data, error } = await supa
    .from("assignments")
    .select("*")
    .eq("teacher_id", userId)
    .eq("class_code", classCode)
    .or(`student_id.eq.${studentId},and(target_type.eq.class,class_code.eq.${classCode})`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(normalizeAssignmentRow);
}

    async function createAssignment(payload) {
      if (!supa) throw new Error("Supabase не підключено");
      const userId = await getCurrentUserId();
      if (!userId) throw new Error("Користувача не знайдено");

      const task = payload.task;
      if (!task?.id) throw new Error("Спочатку вибери завдання з бази");

      const targetType = payload.targetType || "class";
      const classCode = String(payload.classCode || "").trim();
      const studentId = targetType === "student" ? String(payload.studentId || "").trim() : null;

      if (!classCode) throw new Error("Спочатку вибери клас");
      if (targetType === "student" && !studentId) {
        throw new Error("Спочатку вибери учня");
      }

      const row = {
        task_bank_id: task.id,
        teacher_id: userId,
        target_type: targetType,
        class_code: classCode,
        student_id: studentId || null,
        title_snapshot: task.title || "Без назви",
        description_snapshot: task.description || "",
check_mode_snapshot: "manual",
        solution_format_snapshot: task.solution_format || "text",
        max_score_snapshot: Math.max(1, Number(task.max_score || 12)),
        note_for_student: String(payload.noteForStudent || "").trim(),
        due_at: payload.dueAt || null,
        status: "active",
        allow_late_submission: payload.allowLateSubmission !== false,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supa
        .from("assignments")
        .insert(row)
        .select("*")
        .single();

      if (error) throw error;
      return normalizeAssignmentRow(data);
    }
    async function deleteAssignment(assignmentId) {
  if (!supa) throw new Error("Supabase не підключено");
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("Користувача не знайдено");
  if (!assignmentId) throw new Error("Не знайдено призначене завдання");

  const { error } = await supa
    .from("assignments")
    .delete()
    .eq("id", assignmentId)
    .eq("teacher_id", userId);

  if (error) throw error;
  return true;
}
async function updateAssignment(assignmentId, patch) {
  if (!supa) throw new Error("Supabase не підключено");
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("Користувача не знайдено");
  if (!assignmentId) throw new Error("Не знайдено призначене завдання");

  const safePatch = {
    ...patch,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supa
    .from("assignments")
    .update(safePatch)
    .eq("id", assignmentId)
    .eq("teacher_id", userId)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
return {
  getCurrentUserId,
  fetchTeacherClasses,
  fetchStudentsByClass,
  fetchTaskBank,
  createTaskBankItem,
  archiveTaskBankItem,
  fetchAssignments,
  fetchAssignmentsForStudent,
  createAssignment,
  deleteAssignment,
  updateAssignment
};
  }

  return { create };
})();