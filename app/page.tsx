
"use client";

import { useState } from "react";

type Flight = {
  id: number;
  airline: string;
  logo: string;
  code: string;
  departure: string;
  arrival: string;
  price: number;
  color: string;
};

const provinces = [
  "กรุงเทพฯ (BKK)",
  "เชียงใหม่ (CNX)",
  "ภูเก็ต (HKT)",
  "สุโขทัย (THS)",
  "ขอนแก่น (KKC)",
  "เชียงราย (CEI)",
  "หาดใหญ่ (HDY)",
  "กระบี่ (KBV)",
  "อุดรธานี (UTH)",
  "อุบลราชธานี (UBP)",
  "นครศรีธรรมราช (NST)",
  "ชลบุรี (UTP)",
];

const flights: Flight[] = [
  {
    id: 1,
    airline: "การบินไทย",
    logo: "✈",
    code: "TG104",
    departure: "07:20",
    arrival: "09:10",
    price: 1299,
    color: "#6b39a8",
  },
  {
    id: 2,
    airline: "AirAsia",
    logo: "AirAsia",
    code: "FD3435",
    departure: "09:30",
    arrival: "11:20",
    price: 1399,
    color: "#e31b35",
  },
  {
    id: 3,
    airline: "Bangkok Airways",
    logo: "🌊",
    code: "PG215",
    departure: "12:15",
    arrival: "14:05",
    price: 1699,
    color: "#1671b9",
  },
  {
    id: 4,
    airline: "Thai Lion Air",
    logo: "🦁",
    code: "SL510",
    departure: "15:40",
    arrival: "17:30",
    price: 1499,
    color: "#dc1927",
  },
];

const money = (value: number) =>
  value.toLocaleString("th-TH");

export default function Home() {
  const [screen, setScreen] = useState("home");
  const [trip, setTrip] = useState("oneway");
  const [from, setFrom] = useState("กรุงเทพฯ (BKK)");
  const [to, setTo] = useState("เชียงใหม่ (CNX)");
  const [date, setDate] = useState("2026-11-10");
  const [returnDate, setReturnDate] = useState("2026-11-15");
  const [passengers, setPassengers] = useState(1);
  const [selectedFlight, setSelectedFlight] =
    useState<Flight>(flights[0]);
  const [payment, setPayment] = useState("card");
  const [passengerName, setPassengerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingDone, setBookingDone] = useState(false);

  const total = selectedFlight.price * passengers;

  const searchFlights = () => {
    if (from === to) {
      alert("กรุณาเลือกต้นทางและปลายทางให้แตกต่างกัน");
      return;
    }
    setScreen("results");
  };

  const chooseFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setScreen("detail");
  };

  const confirmBooking = () => {
    if (!passengerName.trim() || !email.trim() || !phone.trim()) {
      alert("กรุณากรอกข้อมูลผู้โดยสารให้ครบถ้วน");
      return;
    }
    setBookingDone(true);
  };

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  const formatDate = (value: string) =>
    new Date(value + "T00:00:00").toLocaleDateString(
      "th-TH",
      { day: "numeric", month: "short", year: "numeric" }
    );

  return (
    <main className="min-h-screen bg-[#f4f6fc] text-[#242038]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <button
            onClick={() => setScreen("home")}
            className="flex items-center gap-2"
          >
            <span className="text-3xl text-red-600">✈</span>
            <span>
              <span className="block text-2xl font-black text-red-600">
                SkyFly
              </span>
              <span className="block text-[10px] text-gray-500">
                บินง่าย ไปได้ทุกที่
              </span>
            </span>
          </button>

          <nav className="hidden md:flex gap-7 text-sm font-semibold">
            <button onClick={() => setScreen("home")}
              className="hover:text-red-600">หน้าแรก</button>
            <button onClick={() => setScreen("results")}
              className="hover:text-red-600">จองเที่ยวบิน</button>
            <button onClick={() => alert("โปรโมชั่นพิเศษเร็ว ๆ นี้")}
              className="hover:text-red-600">โปรโมชั่น</button>
            <button onClick={() => alert("บัญชีผู้ใช้งาน")}
              className="hover:text-red-600">บัญชีของฉัน</button>
          </nav>

          <span className="text-red-600 text-xl">♧</span>
        </div>
      </header>

      {/* HOME SCREEN */}
      {screen === "home" && (
        <section>
          <div className="relative min-h-[460px] flex items-center overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,rgba(255,255,255,.95),rgba(255,255,255,.65),rgba(255,255,255,.05)),url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800)",
              }}
            />

            <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-16">
              <div className="max-w-xl">
                <span className="text-red-600 font-bold">
                  ✈ TRAVEL WITH SKYFLY
                </span>
                <h1 className="text-4xl md:text-6xl font-black mt-4 leading-tight">
                  <span className="text-red-600">จองตั๋วเครื่องบิน</span>
                  <br />
                  ไปกับเรา
                </h1>
                <p className="mt-4 text-gray-700 text-lg">
                  ค้นหาเที่ยวบินราคาดี ที่ใช่สำหรับคุณ
                </p>
              </div>
            </div>
          </div>

          {/* BOOKING FORM */}
          <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-20 pb-16">
            <div className="bg-white rounded-3xl shadow-xl p-5 md:p-8">

              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  ["oneway", "✈ เที่ยวเดียว"],
                  ["round", "⇄ ไป-กลับ"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setTrip(value)}
                    className={`px-6 py-3 rounded-full font-bold text-sm ${
                      trip === value
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    ✈ เดินทางจาก
                  </label>
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-red-500"
                  >
                    {provinces.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold">
                      ✈ เดินทางไป
                    </label>
                    <button onClick={swapLocations}
                      className="text-red-600 text-xs font-bold">
                      ⇄ สลับเส้นทาง
                    </button>
                  </div>
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-red-500"
                  >
                    {provinces.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    ▦ วันที่เดินทาง
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-4 bg-gray-50 border rounded-xl"
                  />
                </div>

                {trip === "round" && (
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      ▦ วันที่เดินทางกลับ
                    </label>
                    <input
                      type="date"
                      min={date}
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full p-4 bg-gray-50 border rounded-xl"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold mb-2">
                    ♙ จำนวนผู้โดยสาร
                  </label>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border">
                    <span>ผู้โดยสาร</span>
                    <div className="flex items-center gap-5">
                      <button
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                        className="w-8 h-8 rounded-full bg-white border font-bold"
                      >−</button>
                      <b>{passengers} คน</b>
                      <button
                        onClick={() => setPassengers(Math.min(9, passengers + 1))}
                        className="w-8 h-8 rounded-full bg-white border font-bold"
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={searchFlights}
                className="w-full mt-7 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-black text-lg shadow-lg hover:scale-[1.01] transition"
              >
                🔍 ค้นหาเที่ยวบิน
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SEARCH RESULTS */}
      {screen === "results" && (
        <section className="max-w-5xl mx-auto px-4 py-10 min-h-screen">

          <div className="bg-red-600 rounded-2xl p-6 text-white mb-6">
            <button onClick={() => setScreen("home")}
              className="text-sm mb-5">← กลับหน้าหลัก</button>
            <h1 className="text-2xl font-black">
              ผลการค้นหาเที่ยวบิน
            </h1>
            <p className="mt-2">
              {from} → {to}
            </p>
            <p className="text-sm opacity-90">
              {formatDate(date)} · ผู้โดยสาร {passengers} คน
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4">
            {[8, 9, 10, 11, 12].map((day) => (
              <button
                key={day}
                onClick={() => setDate(`2026-11-${day}`)}
                className={`min-w-20 p-3 rounded-xl shadow-sm ${
                  Number(date.slice(-2)) === day
                    ? "bg-red-600 text-white"
                    : "bg-white"
                }`}
              >
                <span className="block text-xs">พ.ย.</span>
                <b>{day}</b>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mb-5">
            <h2 className="font-black text-xl">
              เที่ยวบินที่แนะนำ
            </h2>
            <span className="text-sm text-gray-500">
              {flights.length} เที่ยวบิน
            </span>
          </div>

          <div className="space-y-4">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-5"
              >
                <div className="w-full md:w-40 flex items-center gap-3">
                  <span
                    className="text-3xl font-black"
                    style={{ color: flight.color }}
                  >
                    {flight.logo}
                  </span>
                  <div>
                    <b className="block text-sm">{flight.airline}</b>
                    <span className="text-xs text-gray-500">
                      {flight.code}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center gap-5">
                  <div>
                    <b className="text-xl">{flight.departure}</b>
                    <p className="text-xs text-gray-500">
                      {from.match(/\((.*?)\)/)?.[1]}
                    </p>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-red-500">● ━━━━━ ✈ ━━━━━ ●</div>
                    <p className="text-xs text-gray-500">
                      บินตรง | 1 ชม. 50 นาที
                    </p>
                  </div>
                  <div>
                    <b className="text-xl">{flight.arrival}</b>
                    <p className="text-xs text-gray-500">
                      {to.match(/\((.*?)\)/)?.[1]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto gap-5 border-t md:border-t-0 pt-4 md:pt-0">
                  <div>
                    <b className="text-red-600 text-2xl">
                      {money(flight.price)}
                    </b>
                    <p className="text-xs text-gray-500">บาท / คน</p>
                  </div>
                  <button
                    onClick={() => chooseFlight(flight)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold"
                  >
                    เลือก →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FLIGHT DETAILS */}
      {screen === "detail" && (
        <section className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
          <button
            onClick={() => setScreen("results")}
            className="text-red-600 font-bold mb-6"
          >
            ← กลับผลการค้นหา
          </button>

          <div className="rounded-3xl overflow-hidden bg-white shadow-lg">
            <div
              className="h-56 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200)",
              }}
            />

            <div className="p-6 md:p-9">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-red-600 font-bold">
                    {selectedFlight.airline}
                  </span>
                  <h1 className="text-2xl font-black mt-1">
                    รายละเอียดเที่ยวบิน
                  </h1>
                </div>
                <span className="text-3xl">✈</span>
              </div>

              <div className="grid grid-cols-3 items-center text-center my-10">
                <div>
                  <b className="text-3xl">{selectedFlight.departure}</b>
                  <p className="font-bold mt-2">
                    {from.match(/\((.*?)\)/)?.[1]}
                  </p>
                </div>
                <div>
                  <span className="text-red-600 text-3xl">✈</span>
                  <p className="text-xs text-gray-500 mt-2">
                    บินตรง
                  </p>
                </div>
                <div>
                  <b className="text-3xl">{selectedFlight.arrival}</b>
                  <p className="font-bold mt-2">
                    {to.match(/\((.*?)\)/)?.[1]}
                  </p>
                </div>
              </div>

              <div className="border-t border-b py-5 space-y-4">
                <h2 className="font-black text-lg">
                  รายละเอียดเที่ยวบิน
                </h2>
                <div className="flex justify-between">
                  <span>ประเภทที่นั่ง</span>
                  <b>ชั้นประหยัด</b>
                </div>
                <div className="flex justify-between">
                  <span>น้ำหนักกระเป๋า</span>
                  <b>20 กก.</b>
                </div>
                <div className="flex justify-between">
                  <span>บริการอาหาร</span>
                  <b>มีบริการ</b>
                </div>
                <div className="flex justify-between">
                  <span>รหัสเที่ยวบิน</span>
                  <b>{selectedFlight.code}</b>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-5 mt-6 flex justify-between items-center">
                <div>
                  <b>ราคารวม</b>
                  <p className="text-xs text-gray-500">
                    {passengers} ผู้โดยสาร
                  </p>
                </div>
                <b className="text-3xl text-red-600">
                  {money(total)} บาท
                </b>
              </div>

              <button
                onClick={() => setScreen("confirm")}
                className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white rounded-xl p-4 font-black text-lg"
              >
                เลือกเที่ยวบินนี้ →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* BOOKING CONFIRMATION */}
      {screen === "confirm" && (
        <section className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
          <button
            onClick={() => {
              setScreen("detail");
              setBookingDone(false);
            }}
            className="text-red-600 font-bold mb-6"
          >
            ← กลับรายละเอียดเที่ยวบิน
          </button>

          {bookingDone ? (
            <div className="bg-white shadow-lg rounded-3xl p-10 text-center">
              <div className="text-7xl mb-5">✅</div>
              <h1 className="text-3xl font-black text-green-600">
                ส่งข้อมูลการจองสำเร็จ!
              </h1>
              <p className="mt-3 text-gray-500">
                นี่คือการจำลองการจองในระบบ Prototype
              </p>
              <div className="bg-gray-50 p-5 rounded-xl my-6 text-left">
                <p>ผู้โดยสาร: {passengerName}</p>
                <p>เที่ยวบิน: {selectedFlight.code}</p>
                <p>เส้นทาง: {from} → {to}</p>
                <p>ยอดรวม: {money(total)} บาท</p>
              </div>
              <button
                onClick={() => {
                  setScreen("home");
                  setBookingDone(false);
                }}
                className="bg-red-600 text-white rounded-xl px-8 py-3 font-bold"
              >
                กลับหน้าหลัก
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-lg p-6 md:p-9">
              <h1 className="text-2xl font-black mb-6">
                ยืนยันการจอง
              </h1>

              <div className="bg-red-50 p-5 rounded-2xl mb-7">
                <h2 className="font-black mb-3">✈ ข้อมูลการเดินทาง</h2>
                <p className="text-sm mb-2">{from} → {to}</p>
                <p className="text-sm mb-2">
                  วันที่ {formatDate(date)}
                </p>
                <p className="text-sm mb-2">
                  {selectedFlight.departure} - {selectedFlight.arrival}
                </p>
                <p className="text-sm">
                  {selectedFlight.airline} · {selectedFlight.code}
                </p>
              </div>

              <h2 className="font-black text-lg mb-4">
                ♙ ข้อมูลผู้โดยสาร
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    ชื่อ-นามสกุล
                  </label>
                  <input
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    placeholder="กรอกชื่อและนามสกุล"
                    className="w-full p-4 border rounded-xl focus:border-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full p-4 border rounded-xl focus:border-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08X-XXX-XXXX"
                    className="w-full p-4 border rounded-xl focus:border-red-500 outline-none"
                  />
                </div>
              </div>

              <div className="mt-8">
                <h2 className="font-black text-lg mb-4">
                  ▣ ช่องทางการชำระเงิน
                </h2>

                <div className="space-y-3">
                  {[
                    ["card", "บัตรเครดิต / เดบิต", "💳"],
                    ["bank", "โอนเงินผ่านธนาคาร", "🏦"],
                    ["promptpay", "พร้อมเพย์", "📱"],
                  ].map(([value, label, icon]) => (
                    <button
                      key={value}
                      onClick={() => setPayment(value)}
                      className={`w-full p-4 border rounded-xl flex items-center gap-3 text-left ${
                        payment === value
                          ? "border-red-600 bg-red-50"
                          : "border-gray-200"
                      }`}
                    >
                      <span className="text-2xl">{icon}</span>
                      <span className="flex-1 font-semibold">{label}</span>
                      <span className="text-red-600">
                        {payment === value ? "◉" : "○"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-8 border-t pt-6">
                <span className="font-bold">ยอดรวมทั้งหมด</span>
                <b className="text-3xl text-red-600">
                  {money(total)} บาท
                </b>
              </div>

              <button
                onClick={confirmBooking}
                className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white rounded-xl p-4 text-lg font-black"
              >
                ยืนยันการจอง
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">
                ระบบนี้เป็น Prototype ยังไม่มีการตัดเงินจริง
              </p>
            </div>
          )}
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-[#201c2b] text-white py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-5">
          <div>
            <h2 className="text-2xl font-black text-red-500">
              ✈ SkyFly
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              บินง่าย ไปได้ทุกที่
            </p>
          </div>
          <div className="text-sm text-gray-400">
            © 2026 SkyFly Flight Booking Prototype
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg grid grid-cols-4 py-2">
        {[
          ["home", "⌂", "หน้าแรก"],
          ["results", "✈", "จองเที่ยวบิน"],
          ["detail", "◇", "โปรโมชั่น"],
          ["confirm", "♙", "บัญชีของฉัน"],
        ].map(([value, icon, label]) => (
          <button
            key={value}
            onClick={() => setScreen(value)}
            className={`flex flex-col items-center text-xs gap-1 ${
              screen === value
                ? "text-red-600 font-black"
                : "text-gray-500"
            }`}
          >
            <span className="text-xl">{icon}</span>
            {label}
          </button>
        ))}
      </div>

      <div className="h-16 md:hidden" />
    </main>
  );
}
