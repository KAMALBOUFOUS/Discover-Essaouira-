
  // إنشاء الخريطة
  const map = L.map('mainMap').setView([31.5085, -9.7595], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // حدث إرسال الفورم
  document.getElementById("cityForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("placeName").value.trim();
    const desc = document.getElementById("description").value.trim();
    const address = document.getElementById("address").value.trim();
    const img = document.getElementById("imageUrl").value.trim();

    // جلب الإحداثيات من Nominatim
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.length === 0) {
      alert("⚠ لم يتم العثور على الموقع. حاول كتابة العنوان بشكل أوضح.");
      return;
    }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    // إضافة البطاقة
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${img}" alt="${name}" />
      <h3>${name}</h3>
      <p>${desc}</p>
      <small>${address}</small>
    `;
    document.getElementById("cardsContainer").appendChild(card);

    // إضافة Marker على الخريطة
    const marker = L.marker([lat, lon]).addTo(map)
      .bindPopup(`<b>${name}</b><br>${desc}`)
      .openPopup();

    // تحريك الخريطة للموقع الجديد
    map.setView([lat, lon], 14);

    // مسح الفورم
    e.target.reset();
  });
