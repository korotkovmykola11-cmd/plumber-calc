function num(id){
  const v = document.getElementById(id)?.value ?? "";
  const n = Number(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}
function money(n, cur){
  return new Intl.NumberFormat("ru-RU", { style:"currency", currency: cur }).format(n);
}
function clampPercent(p){ return Math.max(0, Math.min(100, p)); }

function calcElectric(){
  const cur = document.getElementById("cur").value;

  const points = num("points");           // точки (розетки/выключатели)
  const perPoint = num("perPoint");       // цена за точку
  const cableM = num("cableM");           // кабель метров
  const cablePrice = num("cablePrice");   // цена кабеля за метр
  const hours = num("hours");             // часы
  const rate = num("rate");               // ставка
  const discount = clampPercent(num("discount")); // скидка %

  const materials = (cableM * cablePrice);
  const workPoints = (points * perPoint);
  const workHours = (hours * rate);

  const subtotal = materials + workPoints + workHours;
  const total = subtotal * (1 - discount/100);

  document.getElementById("r_materials").textContent = money(materials, cur);
  document.getElementById("r_work").textContent = money(workPoints + workHours, cur);
  document.getElementById("r_subtotal").textContent = money(subtotal, cur);
  document.getElementById("r_total").textContent = money(total, cur);
}

function resetForm(){
  document.querySelectorAll("input").forEach(i => i.value = "");
  calcElectric();
}

document.addEventListener("input", (e)=>{
  if(e.target && e.target.closest("#electricForm")) calcElectric();
});
document.addEventListener("change", (e)=>{
  if(e.target && e.target.id === "cur") calcElectric();
});
