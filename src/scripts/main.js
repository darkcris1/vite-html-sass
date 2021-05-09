import "../scss/global.scss";
import "bootstrap";
import $ from "jquery";

$("[include-html]").each(function () {
  const el = $(this);
  const filePath = el.attr("include-html").replace(/\.html$/, "") + ".html";

  $.get(filePath, (data) => {
    $(this).replaceWith(data);
  });
});
