
  $(document).ready(() => {
    $("#request-form").submit(function (e) {
      e.preventDefault();

      let from = $("#from-input").val().trim();
      let request = $("#url-input").val().trim();

      if (!from || !request) {
        alert("❗ Mohon isi semua kolom.");
        return;
      }

      $.ajax({
        url: "/send-request",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ from, request }),
        success: () => {
          $("#from-input").val("");
          $("#url-input").val("");
          alert("✅ Terima kasih, request berhasil dikirim.");
        },
        error: (err) => {
          console.error("❌ Gagal mengirim request:", err);
          alert("❌ Gagal mengirim request. Silakan coba lagi.");
        }
      });
    });
  });
