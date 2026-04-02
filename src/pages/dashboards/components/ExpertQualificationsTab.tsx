import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  GraduationCap,
  Loader2,
  Plus,
  Pencil,
  Trash2,
  AlertCircle,
  Check,
} from "lucide-react";
import {
  getMyExpertQualifications,
  createExpertQualification,
  updateExpertQualification,
  deleteExpertQualification,
  ApiHttpError,
  QUALIFICATION_DEGREE_MAX_LENGTH,
  QUALIFICATION_FIELD_MAX_LENGTH,
  QUALIFICATION_INSTITUTION_MAX_LENGTH,
  QUALIFICATION_YEAR_MIN,
  type ExpertQualification,
  type QualificationStatus,
} from "../../../lib/api";

function currentYear(): number {
  return new Date().getFullYear();
}

function validateQualificationInput(
  degree: string,
  field: string,
  institution: string,
  yearStr: string,
): { ok: true; payload: { degree: string; field: string; institution: string; year?: number } } | { ok: false; error: string } {
  const d = degree.trim();
  const f = field.trim();
  const i = institution.trim();
  if (!d) return { ok: false, error: "qualificationDegreeRequired" };
  if (d.length > QUALIFICATION_DEGREE_MAX_LENGTH)
    return { ok: false, error: "qualificationDegreeTooLong" };
  if (!f) return { ok: false, error: "qualificationFieldRequired" };
  if (f.length > QUALIFICATION_FIELD_MAX_LENGTH)
    return { ok: false, error: "qualificationFieldTooLong" };
  if (!i) return { ok: false, error: "qualificationInstitutionRequired" };
  if (i.length > QUALIFICATION_INSTITUTION_MAX_LENGTH)
    return { ok: false, error: "qualificationInstitutionTooLong" };

  const yTrim = yearStr.trim();
  if (!yTrim) {
    return { ok: true, payload: { degree: d, field: f, institution: i } };
  }
  const y = parseInt(yTrim, 10);
  if (Number.isNaN(y) || y < QUALIFICATION_YEAR_MIN || y > currentYear()) {
    return { ok: false, error: "qualificationYearInvalid" };
  }
  return { ok: true, payload: { degree: d, field: f, institution: i, year: y } };
}

function StatusChip({ status }: { status: QualificationStatus }) {
  const { t } = useTranslation("common");
  const map: Record<
    QualificationStatus,
    { className: string; labelKey: string }
  > = {
    PENDING: {
      className: "bg-amber-100 text-amber-800",
      labelKey: "qualificationStatusPending",
    },
    VERIFIED: {
      className: "bg-emerald-100 text-emerald-800",
      labelKey: "qualificationStatusVerified",
    },
    REJECTED: {
      className: "bg-red-100 text-red-800",
      labelKey: "qualificationStatusRejected",
    },
  };
  const c = map[status];
  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${c.className}`}
    >
      {t(c.labelKey)}
    </span>
  );
}

export default function ExpertQualificationsTab() {
  const { t } = useTranslation("common");
  const [items, setItems] = useState<ExpertQualification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [institution, setInstitution] = useState("");
  const [year, setYear] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getMyExpertQualifications();
      setItems(list);
    } catch (e) {
      setError(
        e instanceof ApiHttpError
          ? e.message
          : e instanceof Error
            ? e.message
            : t("qualificationLoadError"),
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void load();
  }, [load]);

  const resetForm = () => {
    setDegree("");
    setField("");
    setInstitution("");
    setYear("");
    setEditingId(null);
    setFormError(null);
    setShowForm(false);
  };

  const startAdd = () => {
    setEditingId(null);
    setDegree("");
    setField("");
    setInstitution("");
    setYear("");
    setFormError(null);
    setInfoMessage(null);
    setShowForm(true);
  };

  const startEdit = (q: ExpertQualification) => {
    setEditingId(q.id);
    setDegree(q.degree);
    setField(q.field);
    setInstitution(q.institution);
    setYear(q.year != null ? String(q.year) : "");
    setFormError(null);
    setInfoMessage(null);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setInfoMessage(null);

    const v = validateQualificationInput(degree, field, institution, year);
    if (!v.ok) {
      setFormError(t(v.error));
      return;
    }

    setSaving(true);
    try {
      if (editingId != null) {
        await updateExpertQualification(editingId, v.payload);
        setInfoMessage(t("qualificationAwaitingVerificationAgain"));
      } else {
        await createExpertQualification(v.payload);
        setInfoMessage(t("qualificationAddedPending"));
      }
      resetForm();
      await load();
    } catch (err) {
      setFormError(
        err instanceof ApiHttpError
          ? err.message
          : err instanceof Error
            ? err.message
            : t("qualificationSaveError"),
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(t("qualificationDeleteConfirm"))) return;
    setDeletingId(id);
    setError(null);
    try {
      await deleteExpertQualification(id);
      await load();
    } catch (err) {
      setError(
        err instanceof ApiHttpError
          ? err.message
          : err instanceof Error
            ? err.message
            : t("qualificationDeleteError"),
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="bg-[hsl(0,0%,97%)] shadow-m rounded-[16px] sm:rounded-[20px] p-[16px] sm:p-[24px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-[16px]">
        <div className="flex items-center gap-[10px]">
          <GraduationCap className="text-primary w-6 h-6" />
          <h2 className="text-[20px] sm:text-[24px] font-semibold text-logo-heading">
            {t("qualificationsTitle")}
          </h2>
        </div>
        {!showForm && (
          <button
            type="button"
            onClick={startAdd}
            className="inline-flex items-center justify-center gap-2 px-[14px] py-[8px] rounded-full text-[13px] sm:text-[14px] font-medium bg-primary text-white shadow-sm hover:bg-primary/90 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            {t("qualificationAdd")}
          </button>
        )}
      </div>

      <p className="text-[13px] sm:text-[14px] text-light-text mb-[16px]">
        {t("qualificationsDescription")}
      </p>

      {error && (
        <div className="mb-[16px] text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-[8px] px-[10px] py-[8px] flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {infoMessage && (
        <div className="mb-[16px] text-[13px] text-green-700 bg-green-50 border border-green-100 rounded-[8px] px-[10px] py-[8px] flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{infoMessage}</span>
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 bg-white rounded-xl border border-gray-200 space-y-3"
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-sm font-semibold text-logo-heading">
              {editingId != null
                ? t("qualificationEditTitle")
                : t("qualificationAddTitle")}
            </h3>
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              {t("cancel")}
            </button>
          </div>

          {formError && (
            <p className="text-sm text-red-600">{formError}</p>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              {t("qualificationDegreeLabel")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              maxLength={QUALIFICATION_DEGREE_MAX_LENGTH + 5}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
              placeholder={t("qualificationDegreePlaceholder")}
            />
            <p className="text-[10px] text-gray-400 mt-0.5">
              {t("qualificationMaxChars", {
                max: QUALIFICATION_DEGREE_MAX_LENGTH,
              })}
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              {t("qualificationFieldLabel")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              value={field}
              onChange={(e) => setField(e.target.value)}
              maxLength={QUALIFICATION_FIELD_MAX_LENGTH + 5}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
              placeholder={t("qualificationFieldPlaceholder")}
            />
            <p className="text-[10px] text-gray-400 mt-0.5">
              {t("qualificationMaxChars", {
                max: QUALIFICATION_FIELD_MAX_LENGTH,
              })}
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              {t("qualificationInstitutionLabel")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              maxLength={QUALIFICATION_INSTITUTION_MAX_LENGTH + 5}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
              placeholder={t("qualificationInstitutionPlaceholder")}
            />
            <p className="text-[10px] text-gray-400 mt-0.5">
              {t("qualificationMaxChars", {
                max: QUALIFICATION_INSTITUTION_MAX_LENGTH,
              })}
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              {t("qualificationYearLabel")}
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min={QUALIFICATION_YEAR_MIN}
              max={currentYear()}
              className="w-full max-w-[140px] px-3 py-2 rounded-lg border border-gray-200 text-sm"
              placeholder={t("qualificationYearPlaceholder")}
            />
            <p className="text-[10px] text-gray-400 mt-0.5">
              {t("qualificationYearHint", {
                min: QUALIFICATION_YEAR_MIN,
                max: currentYear(),
              })}
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? t("saving") : editingId != null ? t("save") : t("qualificationSubmitAdd")}
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8">
          {t("qualificationsEmpty")}
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((q) => (
            <li
              key={q.id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="font-semibold text-logo-heading">
                    {q.degree}
                    {q.year != null ? ` (${q.year})` : ""}
                  </p>
                  <StatusChip status={q.status} />
                </div>
                <p className="text-sm text-gray-700">{q.field}</p>
                <p className="text-sm text-gray-500 mt-0.5">{q.institution}</p>
                {q.status === "REJECTED" && q.rejectionReason && (
                  <p className="text-xs text-red-700 mt-2 bg-red-50 rounded-lg px-2 py-1.5 border border-red-100">
                    {t("qualificationRejectionReason")}: {q.rejectionReason}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => startEdit(q)}
                  disabled={deletingId === q.id}
                  className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer disabled:opacity-50"
                  aria-label={t("qualificationEdit")}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(q.id)}
                  disabled={deletingId === q.id}
                  className="p-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 cursor-pointer disabled:opacity-50"
                  aria-label={t("qualificationDelete")}
                >
                  {deletingId === q.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
