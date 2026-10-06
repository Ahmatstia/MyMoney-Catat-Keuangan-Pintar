const ITEMS = [
  {
    q: "Apakah aplikasi MyMoney gratis?",
    a: "Ya, MyMoney dapat diunduh dan digunakan secara gratis tanpa biaya langganan bulanan tersembunyi.",
  },
  {
    q: "Bagaimana jika ponsel saya hilang atau rusak?",
    a: "Anda dapat memanfaatkan fitur Cadangkan Data (Backup) yang ada di menu Pengaturan untuk menyimpan file cadangan JSON ke Google Drive pribadi Anda.",
  },
  {
    q: "Apakah MyMoney bisa membaca saldo rekening bank otomatis?",
    a: "Tidak. Demi menjaga keamanan saldo perbankan Anda dari risiko peretasan, MyMoney menggunakan sistem pencatatan mandiri yang aman dan tidak terhubung ke API bank Anda.",
  },
];

export default function Faq() {
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
      <h2 className="h-section lg:col-span-4">Pertanyaan yang sering diajukan</h2>

      <div className="faq lg:col-span-8">
        {ITEMS.map((item, i) => (
          <details key={item.q} name="faq" open={i === 0} className="group border-t border-paper-300 last:border-b">
            <summary className="flex items-center justify-between gap-6 py-6 text-left">
              <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">{item.q}</span>
              <span
                aria-hidden="true"
                className="relative h-7 w-7 shrink-0 rounded-full border border-paper-300 transition-colors group-open:border-leaf group-open:bg-leaf"
              >
                <span className="absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 bg-leaf group-open:bg-paper-50" />
                <span className="absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-leaf transition-transform group-open:scale-y-0 group-open:bg-paper-50" />
              </span>
            </summary>
            <div className="faq-body pb-7 pr-12">
              <p className="max-w-xl text-base leading-relaxed text-moss">{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
