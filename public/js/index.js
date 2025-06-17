$(document).ready(() => {
  $("#request-form").submit(function (e) {
    e.preventDefault();

    let from = $("#from-input").val();
    let request = $("#url-input").val();

    if (!from.trim() || !request.trim()) return;

    const sendRequestData = (extraData = {}) => {
      const data = {
        from,
        request,
        ...extraData
      };

      $.ajax({
        url: "/send-request",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: () => {
          $("#from-input").val("");
          $("#url-input").val("");
          alert("✅ Terimakasih Sudah Mengirim Request");
        },
        error: (err) => {
          console.error("❌ Gagal Request:", err);
          alert("❌ Maaf Gagal mengirim request.");
        }
      });
    };

    if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
      navigator.userAgentData.getHighEntropyValues(["model", "platform", "platformVersion"])
        .then(ua => {
          sendRequestData({
            modelInfo: ua.model || "Unknown",
            platformInfo: ua.platform || "Unknown",
            versiInfo: ua.platformVersion || "Unknown"
          });
        });
    } else {
      sendRequestData();
    }
  });
});
