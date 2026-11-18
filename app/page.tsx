
"use client";

import React, { useEffect, useState } from "react";

type Flight = {
  id: number;
  airline: string;
  logo: string;
  code: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  color: string;
};

const flights: Flight[] = [
  { id: 1, airline: "การบินไทย", logo: "✈️", code: "TG104", departure: "07:20", arrival: "09:10", duration: "1 ชม. 50 นาที", price: 1299, color: "purple" },
  { id: 2, airline: "AirAsia", logo: "A", code: "FD3437", departure: "09:30", arrival: "11:20", duration: "1 ชม. 50 นาที", price: 1399, color: "red" },
  { id: 3, airline: "Bangkok Airways", logo: "🛫", code: "PG215", departure: "12:15", arrival: "14:05", duration: "1 ชม. 50 นาที", price: 1699, color: "blue" },
  { id: 4, airline: "Thai Lion Air", logo: "🦁", code: "SL510", departure: "15:40", arrival: "17:30", duration: "1 ชม. 50 นาที", price: 1499, color: "orange" },
  { id: 5, airline: "Nok Air", logo: "🐦", code: "DD122", departure: "18:20", arrival: "20:10", duration: "1 ชม. 50 นาที", price: 1599, color: "yellow" },
];

const provinces = [
  "กรุงเทพฯ (BKK)",
  "เชียงใหม่ (CNX)",
  "ภูเก็ต (HKT)",
  "เชียงราย (CEI)",
  "ขอนแก่น (KKC)",
  "หาดใหญ่ (HDY)",
  "กระบี่ (KBV)",
  "อุดรธานี (UTH)",
];

export default function Home() {
  const [page, setPage] = useState("home");
  const [trip, setTrip] = useState("oneway");
  const [from, setFrom] = useState("กรุงเทพฯ (BKK)");
  const [to, setTo] = useState("เชียงใหม่ (CNX)");
  const [date, setDate] = useState("2026-11-20");
  const [returnDate, setReturnDate] = useState("2026-11-25");
  const [passengers, setPassengers] = useState(1);
  const [seat, setSeat] = useState("ชั้นประหยัด");
  const [selected, setSelected] = useState<Flight | null>(null);
  const [payment, setPayment] = useState("card");
  const [filter, setFilter] = useState("ทั้งหมด");
  const [sort, setSort] = useState("ราคาถูกที่สุด");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [favorites, setFavorites] = useState<number[]>([]);
  const [bookings, setBookings] = useState<Flight[]>([]);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("skyfly-favorites");
    const savedBookings = localStorage.getItem("skyfly-bookings");
    const savedUser = localStorage.getItem("skyfly-user");

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setForm({
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phone,
      });
      setRegistered(true);
    }
  }, []);

  const saveFavorites = (data: number[]) => {
    setFavorites(data);
    localStorage.setItem("skyfly-favorites", JSON.stringify(data));
  };

  const toggleFavorite = (id: number) => {
    const next = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id];
    saveFavorites(next);
  };

  const filteredFlights = flights
    .filter((f) =>
      filter === "ทั้งหมด" ? true : f.airline === filter
    )
    .sort((a, b) =>
      sort === "ราคาถูกที่สุด"
        ? a.price - b.price
        : b.price - a.price
    );

  const searchFlights = () => {
    if (from === to) {
      alert("กรุณาเลือกสนามบินต้นทางและปลายทางให้แตกต่างกัน");
      return;
    }
    setSearchDone(true);
    setPage("results");
    setBookingDone(false);
  };

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  const register = () => {
    if (!form.name || !form.email || !user.password) {
      alert("กรุณากรอกชื่อ อีเมล และรหัสผ่านให้ครบ");
      return;
    }

    const newUser = {
      ...form,
      password: user.password,
    };

    setUser(newUser);
    localStorage.setItem("skyfly-user", JSON.stringify(newUser));
    setRegistered(true);
    setShowSignup(false);
    alert("สมัครสมาชิกสำเร็จ ยินดีต้อนรับสู่ SkyFly!");
  };

  const updateProfile = () => {
    const updated = { ...user, ...form };
    setUser(updated);
    localStorage.setItem("skyfly-user", JSON.stringify(updated));
    setShowEdit(false);
    alert("บันทึกข้อมูลเรียบร้อยแล้ว");
  };

  const confirmBooking = () => {
    if (!selected) return;

    const updated = [selected, ...bookings];
    setBookings(updated);
    localStorage.setItem("skyfly-bookings", JSON.stringify(updated));
    setBookingDone(true);
    setPage("success");
  };

  const money = (n: number) =>
    n.toLocaleString("th-TH");

  const navItems = [
    { id: "home", icon: "⌂", label: "หน้าแรก" },
    { id: "results", icon: "✈", label: "จองเที่ยวบิน" },
    { id: "favorites", icon: "♡", label: "รายการโปรด" },
    { id: "bookings", icon: "▤", label: "การจองของฉัน" },
    { id: "profile", icon: "♙", label: "บัญชีของฉัน" },
  ];

  const goTo = (p: string) => {
    setPage(p);
    setMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#f5f6fa] text-slate-800">

      {/* TOP NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 h-[76px] flex items-center justify-between">

          <button onClick={() => goTo("home")} className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center text-2xl shadow-lg shadow-red-200">
              ✈
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-black tracking-tight text-red-600">
                SkyFly
              </h1>
              <p className="text-[10px] text-gray-400">
                บินง่าย ไปได้ทุกที่
              </p>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {navItems.slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className={`text-sm font-semibold transition ${
                  page === item.id
                    ? "text-red-600"
                    : "text-gray-500 hover:text-red-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {registered ? (
              <button
                onClick={() => goTo("profile")}
                className="flex items-center gap-2 bg-red-50 rounded-full px-3 py-2 text-red-600 font-bold text-sm"
              >
                <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center">
                  {user.name.charAt(0)}
                </span>
                <span className="hidden sm:block">{user.name}</span>
              </button>
            ) : (
              <button
                onClick={() => setShowSignup(true)}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-5 py-2.5 text-sm font-bold shadow-lg shadow-red-200 transition"
              >
                สมัครสมาชิก
              </button>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-2xl p-2"
            >
              ☰
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-2 shadow-xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className="w-full text-left p-3 rounded-xl hover:bg-red-50"
              >
                {item.icon}　{item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-7">

        {/* HOME PAGE */}
        {page === "home" && (
          <div className="space-y-8">

            <section className="relative min-h-[390px] md:min-h-[450px] rounded-[32px] overflow-hidden bg-gradient-to-r from-[#160e26] via-[#8c182a] to-[#ed2637]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_75%_30%,white,transparent_35%)]" />
              <div className="absolute right-[-5%] top-[-10%] text-[220px] md:text-[350px] opacity-20 rotate-[-15deg]">
                ✈
              </div>

              <div className="relative z-10 p-7 md:p-16 max-w-2xl text-white">
                <span className="inline-block bg-white/15 px-4 py-2 rounded-full text-xs font-bold mb-5 backdrop-blur">
                  ✦ SPECIAL FLIGHT DEALS
                </span>
                <h2 className="text-4xl md:text-6xl font-black leading-tight">
                  ออกเดินทาง
                  <br />
                  ไปกับเรา
                </h2>
                <p className="mt-4 text-white/80 text-sm md:text-lg">
                  ค้นหาเที่ยวบินราคาดีที่สุด พร้อมประสบการณ์การเดินทางที่สะดวกสบาย
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="bg-white/15 rounded-xl px-4 py-3 text-sm">✈ เที่ยวบินราคาพิเศษ</span>
                  <span className="bg-white/15 rounded-xl px-4 py-3 text-sm">♡ จองง่ายในไม่กี่ขั้นตอน</span>
                </div>
              </div>
            </section>

            {/* SEARCH FORM */}
            <section className="bg-white rounded-[28px] p-5 md:p-8 shadow-xl shadow-slate-200/60 -mt-20 relative z-20 max-w-6xl mx-auto">

              <div className="flex flex-wrap gap-3 mb-7">
                <button
                  onClick={() => setTrip("oneway")}
                  className={`rounded-full px-6 py-2.5 font-bold text-sm ${
                    trip === "oneway" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  ✈ เที่ยวเดียว
                </button>
                <button
                  onClick={() => setTrip("round")}
                  className={`rounded-full px-6 py-2.5 font-bold text-sm ${
                    trip === "round" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  ⇄ ไป-กลับ
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_50px_1fr_1fr_1fr] gap-3 items-end">

                <div>
                  <label className="text-xs text-gray-400 font-bold mb-2 block">จาก (ต้นทาง)</label>
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full border border-gray-200 rounded-2xl p-4 font-bold bg-gray-50 outline-none focus:border-red-500"
                  >
                    {provinces.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>

                <button
                  onClick={swapLocations}
                  className="h-[54px] rounded-2xl bg-red-50 text-red-600 text-xl hover:bg-red-100"
                  title="สลับสนามบิน"
                >
                  ⇄
                </button>

                <div>
                  <label className="text-xs text-gray-400 font-bold mb-2 block">ไปยัง (ปลายทาง)</label>
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full border border-gray-200 rounded-2xl p-4 font-bold bg-gray-50 outline-none focus:border-red-500"
                  >
                    {provinces.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-bold mb-2 block">วันเดินทาง</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-2xl p-4 bg-gray-50 outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-bold mb-2 block">ผู้โดยสาร</label>
                  <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-3 bg-gray-50">
                    <button
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="w-8 h-8 rounded-lg bg-white shadow text-red-600"
                    >−</button>
                    <span className="font-bold">{passengers} คน</span>
                    <button
                      onClick={() => setPassengers(Math.min(9, passengers + 1))}
                      className="w-8 h-8 rounded-lg bg-white shadow text-red-600"
                    >+</button>
                  </div>
                </div>
              </div>

              {trip === "round" && (
                <div className="mt-4 max-w-xs">
                  <label className="text-xs text-gray-400 font-bold mb-2 block">วันเดินทางกลับ</label>
                  <input
                    type="date"
                    min={date}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-2xl p-4 bg-gray-50"
                  />
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <select
                  value={seat}
                  onChange={(e) => setSeat(e.target.value)}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white"
                >
                  <option>ชั้นประหยัด</option>
                  <option>ชั้นธุรกิจ</option>
                  <option>ชั้นหนึ่ง</option>
                </select>

                <button
                  onClick={searchFlights}
                  className="w-full sm:w-auto px-12 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black shadow-lg shadow-red-200 transition"
                >
                  🔍 ค้นหาเที่ยวบิน
                </button>
              </div>
            </section>

            {/* PROMOTION */}
            <section>
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="text-2xl font-black">โปรโมชั่นแนะนำ</h3>
                  <p className="text-sm text-gray-400 mt-1">จุดหมายปลายทางยอดนิยม</p>
                </div>
                <button onClick={() => goTo("results")} className="text-red-600 text-sm font-bold">
                  ดูเที่ยวบินทั้งหมด →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { name: "เชียงใหม่", code: "CNX", price: "1,299", emoji: "🏔️", desc: "สัมผัสธรรมชาติและวัฒนธรรม" },
                  { name: "ภูเก็ต", code: "HKT", price: "1,599", emoji: "🏝️", desc: "เที่ยวทะเล พักผ่อนสบาย" },
                  { name: "เชียงราย", code: "CEI", price: "1,499", emoji: "⛰️", desc: "ชมวิวภูเขาและวัดสวย" },
                ].map((p) => (
                  <div key={p.code} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition group">
                    <div className="h-36 bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center text-7xl group-hover:scale-105 transition">
                      {p.emoji}
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center">
                        <h4 className="font-black text-xl">{p.name}</h4>
                        <span className="text-xs bg-red-50 text-red-600 rounded-full px-3 py-1">{p.code}</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-2">{p.desc}</p>
                      <div className="flex justify-between items-center mt-5">
                        <p className="text-sm">เริ่มต้น <b className="text-red-600 text-xl">{p.price}</b> บาท</p>
                        <button
                          onClick={() => {
                            setTo(p.name + " (" + p.code + ")");
                            goTo("home");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
                        >
                          จองเลย
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* RESULTS PAGE */}
        {page === "results" && (
          <div className="space-y-6">

            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-7 rounded-[28px]">
              <button onClick={() => goTo("home")} className="text-white/70 text-sm mb-5">
                ← กลับหน้าค้นหา
              </button>
              <h2 className="text-3xl font-black">ผลการค้นหาเที่ยวบิน</h2>
              <p className="mt-2 text-white/80">
                {from}　→　{to}
              </p>
              <p className="text-sm text-white/70 mt-1">
                {date} · ผู้โดยสาร {passengers} คน · {seat}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-between items-center">
              <p className="font-bold text-lg">เที่ยวบินที่พบ {filteredFlights.length} รายการ</p>
              <div className="flex flex-wrap gap-2">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-white border rounded-xl px-4 py-3 text-sm"
                >
                  <option>ราคาถูกที่สุด</option>
                  <option>ราคาแพงที่สุด</option>
                </select>
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="bg-white border rounded-xl px-4 py-3 text-sm font-bold"
                >
                  ⚙ ตัวกรอง
                </button>
              </div>
            </div>

            {showFilter && (
              <div className="bg-white rounded-2xl p-5 flex flex-wrap gap-3">
                {["ทั้งหมด", ...flights.map((f) => f.airline)].map((name) => (
                  <button
                    key={name}
                    onClick={() => setFilter(name)}
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                      filter === name ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-4">
              {filteredFlights.map((f) => (
                <div key={f.id} className="bg-white rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-lg transition">
                  <div className="flex flex-col md:flex-row items-center gap-5">
                    <div className="flex items-center gap-3 w-full md:w-48">
                      <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-2xl">
                        {f.logo}
                      </div>
                      <div>
                        <p className="font-black text-sm">{f.airline}</p>
                        <p className="text-xs text-gray-400">{f.code}</p>
                      </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center gap-5 w-full">
                      <div className="text-center">
                        <p className="text-2xl font-black">{f.departure}</p>
                        <p className="text-sm text-gray-400">BKK</p>
                      </div>
                      <div className="flex-1 max-w-40 text-center">
                        <p className="text-xs text-gray-400 mb-2">{f.duration}</p>
                        <div className="flex items-center gap-2">
                          <div className="h-px bg-red-300 flex-1" />
                          <span className="text-red-600">✈</span>
                          <div className="h-px bg-red-300 flex-1" />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">บินตรง</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-black">{f.arrival}</p>
                        <p className="text-sm text-gray-400">CNX</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto">
                      <div>
                        <p className="text-xs text-gray-400">ราคาเริ่มต้น</p>
                        <p className="text-2xl font-black text-red-600">{money(f.price)} ฿</p>
                      </div>

                      <button
                        onClick={() => toggleFavorite(f.id)}
                        className={`text-2xl ${favorites.includes(f.id) ? "text-red-600" : "text-gray-300"}`}
                        title="บันทึกรายการโปรด"
                      >
                        ♥
                      </button>

                      <button
                        onClick={() => {
                          setSelected(f);
                          setPage("detail");
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-5 py-3 font-bold text-sm"
                      >
                        เลือกเที่ยวบิน →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredFlights.length === 0 && (
              <div className="bg-white p-12 text-center rounded-3xl text-gray-400">
                ไม่พบเที่ยวบินที่ตรงกับตัวกรอง
              </div>
            )}
          </div>
        )}

        {/* FLIGHT DETAIL */}
        {page === "detail" && selected && (
          <div className="max-w-3xl mx-auto space-y-6">
            <button onClick={() => goTo("results")} className="text-gray-500 font-bold">
              ← กลับผลการค้นหา
            </button>

            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-8 rounded-[28px]">
              <p className="text-white/70 text-sm">FLIGHT DETAILS</p>
              <h2 className="text-3xl font-black mt-2">รายละเอียดเที่ยวบิน</h2>
              <p className="mt-2">{from} → {to}</p>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm">
              <div className="flex gap-4 items-center border-b pb-6">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl">
                  {selected.logo}
                </div>
                <div>
                  <h3 className="text-xl font-black">{selected.airline}</h3>
                  <p className="text-gray-400">{selected.code}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 items-center text-center py-9">
                <div>
                  <p className="text-4xl font-black">{selected.departure}</p>
                  <p className="font-bold mt-2">BKK</p>
                  <p className="text-xs text-gray-400">กรุงเทพฯ</p>
                </div>
                <div>
                  <p className="text-red-600 text-3xl">✈</p>
                  <div className="h-px bg-red-200 my-2" />
                  <p className="text-xs text-gray-400">{selected.duration}</p>
                </div>
                <div>
                  <p className="text-4xl font-black">{selected.arrival}</p>
                  <p className="font-bold mt-2">CNX</p>
                  <p className="text-xs text-gray-400">เชียงใหม่</p>
                </div>
              </div>

              <div className="border-t pt-5 space-y-4">
                <h4 className="font-black">รายละเอียดการเดินทาง</h4>
                <div className="flex justify-between text-sm">
                  <span>✈ ประเภทที่นั่ง</span>
                  <b>{seat}</b>
                </div>
                <div className="flex justify-between text-sm">
                  <span>▣ สัมภาระ</span>
                  <b>20 กก.</b>
                </div>
                <div className="flex justify-between text-sm">
                  <span>♙ ผู้โดยสาร</span>
                  <b>{passengers} คน</b>
                </div>
                <div className="flex justify-between text-sm">
                  <span>☑ บริการอาหาร</span>
                  <b>มีบริการ</b>
                </div>
              </div>

              <div className="bg-red-50 rounded-2xl p-5 mt-6 flex justify-between items-center">
                <span className="font-bold">ราคารวมโดยประมาณ</span>
                <span className="text-2xl font-black text-red-600">
                  {money(selected.price * passengers)} บาท
                </span>
              </div>

              <button
                onClick={() => {
                  if (!registered) {
                    setShowSignup(true);
                    return;
                  }
                  setPage("checkout");
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl py-4 mt-6 font-black"
              >
                ดำเนินการจองเที่ยวบิน →
              </button>
            </div>
          </div>
        )}

        {/* CHECKOUT */}
        {page === "checkout" && selected && (
          <div className="max-w-3xl mx-auto space-y-6">
            <button onClick={() => goTo("detail")} className="text-gray-500 font-bold">
              ← กลับ
            </button>
            <h2 className="text-3xl font-black">ยืนยันการจอง</h2>

            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="font-black text-lg mb-5">✈ ข้อมูลการเดินทาง</h3>
              <div className="bg-red-50 rounded-2xl p-5">
                <p className="font-black">{from} → {to}</p>
                <p className="text-sm text-gray-500 mt-2">{date}</p>
                <p className="mt-3 font-bold">{selected.airline} ({selected.code})</p>
                <p className="text-sm mt-1">{selected.departure} → {selected.arrival}</p>
                <p className="text-sm mt-1">ผู้โดยสาร {passengers} คน</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="font-black text-lg mb-5">♙ ข้อมูลผู้โดยสาร</h3>
              <div className="space-y-3">
                <p>ชื่อ-นามสกุล: <b>{user.name}</b></p>
                <p>อีเมล: <b>{user.email}</b></p>
                <p>เบอร์โทรศัพท์: <b>{user.phone}</b></p>
                <button onClick={() => {
                  setForm({ name: user.name, email: user.email, phone: user.phone });
                  setShowEdit(true);
                }} className="text-red-600 text-sm font-bold">
                  ✎ แก้ไขข้อมูลผู้โดยสาร
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="font-black text-lg mb-5">▣ ช่องทางการชำระเงิน</h3>
              {[
                { id: "card", label: "บัตรเครดิต / เดบิต", icon: "💳" },
                { id: "bank", label: "โอนเงินผ่านธนาคาร", icon: "🏦" },
                { id: "promptpay", label: "พร้อมเพย์", icon: "📱" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPayment(p.id)}
                  className={`w-full p-4 mb-3 rounded-xl border flex items-center gap-4 ${
                    payment === p.id ? "border-red-500 bg-red-50" : "border-gray-100"
                  }`}
                >
                  <span className="text-2xl">{p.icon}</span>
                  <span className="font-bold text-sm">{p.label}</span>
                  <span className="ml-auto text-red-600">{payment === p.id ? "●" : "○"}</span>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm flex justify-between items-center">
              <span className="font-bold">ยอดรวมทั้งหมด</span>
              <span className="text-3xl font-black text-red-600">
                {money(selected.price * passengers)} บาท
              </span>
            </div>

            <button
              onClick={confirmBooking}
              className="w-full py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-red-200"
            >
              ยืนยันการจอง ✓
            </button>
            <p className="text-center text-xs text-gray-400">
              * ระบบนี้เป็น Prototype สำหรับทดลองการใช้งาน ไม่ได้ตัดเงินจริง
            </p>
          </div>
        )}

        {/* SUCCESS PAGE */}
        {page === "success" && (
          <div className="max-w-xl mx-auto bg-white rounded-[32px] p-8 md:p-12 text-center shadow-xl">
            <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center text-5xl text-green-600">
              ✓
            </div>
            <h2 className="text-3xl font-black mt-6">จองเที่ยวบินสำเร็จ!</h2>
            <p className="text-gray-400 mt-3">
              ขอบคุณที่เลือกใช้บริการ SkyFly
            </p>
            <div className="bg-gray-50 rounded-2xl p-5 mt-7 text-left">
              <p className="text-xs text-gray-400">BOOKING REFERENCE</p>
              <p className="text-2xl font-black text-red-600 mt-1">
                SF{Date.now().toString().slice(-8)}
              </p>
              <p className="mt-4 text-sm">ผู้จอง: {user.name}</p>
              <p className="text-sm mt-2">สายการบิน: {selected?.airline}</p>
              <p className="text-sm mt-2">เที่ยวบิน: {selected?.code}</p>
              <p className="text-sm mt-2">ยอดชำระ: {selected ? money(selected.price * passengers) : 0} บาท</p>
              <p className="text-xs text-gray-400 mt-3">
                สถานะ: บันทึกการจองในระบบทดลองแล้ว
              </p>
            </div>
            <button onClick={() => goTo("bookings")} className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold mt-7">
              ดูรายการจองของฉัน
            </button>
            <button onClick={() => goTo("home")} className="mt-4 text-gray-400 text-sm">
              กลับหน้าหลัก
            </button>
          </div>
        )}

        {/* FAVORITES */}
        {page === "favorites" && (
          <div>
            <h2 className="text-3xl font-black mb-2">♡ รายการโปรด</h2>
            <p className="text-gray-400 mb-7">เที่ยวบินที่คุณบันทึกไว้</p>
            {flights.filter((f) => favorites.includes(f.id)).length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center">
                <p className="text-5xl">♡</p>
                <p className="font-bold mt-4">ยังไม่มีเที่ยวบินที่บันทึกไว้</p>
                <button onClick={() => goTo("results")} className="mt-5 text-red-600 font-bold">
                  ค้นหาเที่ยวบิน →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {flights.filter((f) => favorites.includes(f.id)).map((f) => (
                  <div key={f.id} className="bg-white rounded-2xl p-5 flex justify-between items-center">
                    <div>
                      <b>{f.airline}</b>
                      <p className="text-sm text-gray-400">{f.departure} → {f.arrival}</p>
                      <p className="text-red-600 font-black mt-1">{money(f.price)} บาท</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => {
                        setSelected(f);
                        setPage("detail");
                      }} className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm">
                        ดูรายละเอียด
                      </button>
                      <button onClick={() => toggleFavorite(f.id)} className="text-red-500 text-xl">♥</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BOOKINGS */}
        {page === "bookings" && (
          <div>
            <h2 className="text-3xl font-black mb-2">▤ การจองของฉัน</h2>
            <p className="text-gray-400 mb-7">ประวัติเที่ยวบินที่คุณเลือกจอง</p>
            {bookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center">
                <p className="text-5xl">✈</p>
                <p className="font-bold mt-4">ยังไม่มีประวัติการจอง</p>
                <button onClick={() => goTo("home")} className="mt-5 text-red-600 font-bold">
                  เริ่มค้นหาเที่ยวบิน →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b, i) => (
                  <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-black text-lg">{b.airline}</p>
                        <p className="text-xs text-gray-400">{b.code}</p>
                      </div>
                      <span className="h-fit bg-green-50 text-green-600 px-3 py-2 rounded-full text-xs font-bold">
                        บันทึกแล้ว
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <div>
                        <p className="text-2xl font-black">{b.departure}</p>
                        <p className="text-xs text-gray-400">BKK</p>
                      </div>
                      <span className="text-red-500">✈ ━━━━━</span>
                      <div className="text-right">
                        <p className="text-2xl font-black">{b.arrival}</p>
                        <p className="text-xs text-gray-400">CNX</p>
                      </div>
                    </div>
                    <p className="text-red-600 font-black mt-5">{money(b.price)} บาท</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROFILE */}
        {page === "profile" && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black mb-7">บัญชีของฉัน</h2>
            <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-8 text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                ♙
              </div>
              <h3 className="text-2xl font-black mt-4">{user.name || "ผู้ใช้งาน SkyFly"}</h3>
              <p className="text-white/70 mt-1">{user.email || "ยังไม่ได้เข้าสู่ระบบ"}</p>
            </div>

            <div className="bg-white rounded-3xl p-7 mt-5 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-xl">ข้อมูลส่วนตัว</h3>
                <button
                  onClick={() => {
                    setForm({ name: user.name, email: user.email, phone: user.phone });
                    setShowEdit(true);
                  }}
                  className="text-red-600 font-bold text-sm"
                >
                  ✎ แก้ไขข้อมูล
                </button>
              </div>
              {[
                ["ชื่อ-นามสกุล", user.name],
                ["อีเมล", user.email],
                ["เบอร์โทรศัพท์", user.phone],
              ].map(([label, value]) => (
                <div key={label} className="py-4 border-b border-gray-100 flex justify-between gap-4">
                  <span className="text-gray-400 text-sm">{label}</span>
                  <span className="font-bold text-sm text-right">{value || "-"}</span>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3 mt-7">
                <button onClick={() => goTo("bookings")} className="p-4 rounded-xl bg-red-50 text-red-600 font-bold text-sm">
                  ▤ ประวัติการจอง
                </button>
                <button onClick={() => goTo("favorites")} className="p-4 rounded-xl bg-red-50 text-red-600 font-bold text-sm">
                  ♡ รายการโปรด
                </button>
              </div>
              {registered && (
                <button
                  onClick={() => {
                    if (confirm("ต้องการออกจากระบบหรือไม่?")) {
                      setRegistered(false);
                      setUser({ name: "", email: "", phone: "", password: "" });
                      setForm({ name: "", email: "", phone: "" });
                      localStorage.removeItem("skyfly-user");
                      goTo("home");
                    }
                  }}
                  className="mt-7 w-full border border-red-200 text-red-600 p-3 rounded-xl font-bold"
                >
                  ออกจากระบบ
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-[#171725] text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h2 className="text-3xl font-black text-red-500">✈ SkyFly</h2>
            <p className="text-gray-400 text-sm mt-3">บินง่าย ไปได้ทุกที่</p>
          </div>
          <div>
            <h3 className="font-bold mb-3">เมนู</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <button onClick={() => goTo("home")} className="block">หน้าแรก</button>
              <button onClick={() => goTo("results")} className="block">จองเที่ยวบิน</button>
              <button onClick={() => goTo("bookings")} className="block">การจองของฉัน</button>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-3">ติดต่อเรา</h3>
            <p className="text-gray-400 text-sm">Email: support@skyfly.example</p>
            <p className="text-gray-400 text-sm mt-2">SkyFly Travel Prototype</p>
          </div>
        </div>
        <div className="border-t border-white/10 text-center text-xs text-gray-500 py-5">
          © 2026 SkyFly. Prototype Application.
        </div>
      </footer>

      {/* SIGNUP MODAL */}
      {showSignup && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] p-7 w-full max-w-md relative">
            <button onClick={() => setShowSignup(false)} className="absolute right-5 top-5 text-gray-400 text-xl">✕</button>
            <div className="text-center mb-6">
              <div className="text-4xl text-red-600">✈</div>
              <h2 className="text-2xl font-black mt-3">สมัครสมาชิก SkyFly</h2>
              <p className="text-sm text-gray-400 mt-2">เริ่มต้นการเดินทางไปกับเรา</p>
            </div>
            <div className="space-y-4">
              <input
                placeholder="ชื่อ-นามสกุล"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-xl p-4 outline-none focus:border-red-500"
              />
              <input
                type="email"
                placeholder="อีเมล"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border rounded-xl p-4 outline-none focus:border-red-500"
              />
              <input
                placeholder="เบอร์โทรศัพท์"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border rounded-xl p-4 outline-none focus:border-red-500"
              />
              <input
                type="password"
                placeholder="ตั้งรหัสผ่าน"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full border rounded-xl p-4 outline-none focus:border-red-500"
              />
              <button onClick={register} className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl p-4 font-black">
                สมัครสมาชิก
              </button>
              <p className="text-xs text-gray-400 text-center">
                ข้อมูลสมาชิกจะถูกเก็บไว้ในเบราว์เซอร์สำหรับ Prototype
              </p>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {showEdit && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] p-7 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black">แก้ไขข้อมูลส่วนตัว</h2>
              <button onClick={() => setShowEdit(false)} className="text-gray-400 text-xl">✕</button>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold">ชื่อ-นามสกุล</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-xl p-4"
              />
              <label className="block text-sm font-bold">อีเมล</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border rounded-xl p-4"
              />
              <label className="block text-sm font-bold">เบอร์โทรศัพท์</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border rounded-xl p-4"
              />
              <button onClick={updateProfile} className="w-full bg-red-600 text-white rounded-xl p-4 font-black">
                บันทึกการแก้ไข
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
