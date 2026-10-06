const ROWS = [
  { label: "Privasi data finansial", mine: "100% di memori ponsel Anda", other: "Tersimpan di server pihak ketiga" },
  { label: "Bisa dipakai tanpa internet", mine: "Bisa, lancar tanpa sinyal", other: "Tidak bisa, butuh kuota" },
  { label: "Wajib daftar akun / email", mine: "Tidak perlu sama sekali", other: "Wajib login dan verifikasi data" },
  { label: "Iklan mengganggu", mine: "Nol iklan, bebas iklan", other: "Sering muncul banner/pop-up" },
] as const;

function Receipt({
  title,
  subtitle,
  values,
  stamp,
  stampClass,
  className = "",
}: {
  title: string;
  subtitle: string;
  values: string[];
  stamp: string;
  stampClass: string;
  className?: string;
}) {
  return (
    <div className={"drop-shadow-[0_16px_24px_rgba(0,0,0,0.5)] " + className}>
      <div className="receipt px-6 pt-7 sm:px-8">
        <p className="font-display text-2xl font-bold leading-none">{title}</p>
        <p className="mt-1.5 text-xs text-moss">{subtitle}</p>
        <div className="my-5 border-t border-dashed border-leaf/40" />

        <ul className="space-y-5">
          {ROWS.map((r, i) => (
            <li key={r.label}>
              <p className="text-xs text-moss">{r.label}</p>
              <p className="mt-0.5 text-[15px] font-medium leading-snug">{values[i]}</p>
            </li>
          ))}
        </ul>

        <div className="my-5 border-t border-dashed border-leaf/40" />
        <div className="flex justify-end pb-2">
          <span className={"stamp " + stampClass}>{stamp}</span>
        </div>
      </div>
    </div>
  );
}

export default function CompareReceipts() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <h2 className="h-section max-w-3xl text-paper-50">Mengapa pendekatan offline-first lebih baik?</h2>
      <p className="lede mt-5 text-mist">
        Perbandingan transparan MyMoney dengan aplikasi pencatat keuangan berbasis server cloud biasa.
      </p>

      <div className="mt-14 grid items-start gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
        <Receipt
          title="MyMoney"
          subtitle="Offline-first"
          values={ROWS.map((r) => r.mine)}
          stamp="Tersimpan di ponsel"
          stampClass="text-signal-deep"
          className="md:-rotate-1"
        />
        <Receipt
          title="Aplikasi cloud biasa"
          subtitle="Berbasis server"
          values={ROWS.map((r) => r.other)}
          stamp="Terkirim ke server"
          stampClass="text-stamp"
          className="md:mt-12 md:rotate-1"
        />
      </div>
    </div>
  );
}
