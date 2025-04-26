document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".cmp_det_comment_author_create_date")
    .forEach((span) => {
      const utcText = span.textContent.trim();

      if (utcText) {
        const date = new Date(utcText + " UTC");

        if (!isNaN(date)) {
          const localDate = date.toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          span.textContent = localDate;
        } else {
          console.error("Invalid date format:", utcText);
        }
      }
    });
});
