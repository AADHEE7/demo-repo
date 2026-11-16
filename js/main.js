(function () {
  var WHATSAPP = "919999900000";
  var DEFAULT_TEXT = "Hello Aadhav Academy, I would like to enquire about coaching in T. Nagar.";

  function waUrl(text) {
    return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text || DEFAULT_TEXT);
  }

  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    el.href = waUrl(el.getAttribute("data-whatsapp"));
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var stack = document.querySelector(".top-stack");
  if (stack) {
    var onScroll = function () {
      stack.classList.toggle("is-scrolled", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var menuLabel = document.getElementById("menu-label");

  function closeMenu() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    if (menuLabel) menuLabel.textContent = "Open menu";
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  }

  function openMenu() {
    toggle.setAttribute("aria-expanded", "true");
    if (menuLabel) menuLabel.textContent = "Close menu";
    nav.classList.add("is-open");
    document.body.classList.add("nav-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      if (toggle.getAttribute("aria-expanded") === "true") closeMenu();
      else openMenu();
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    var desktop = window.matchMedia("(min-width: 880px)");
    var onDesktop = function (event) {
      if (event.matches) closeMenu();
    };
    if (desktop.addEventListener) desktop.addEventListener("change", onDesktop);
  }

  document.body.classList.toggle("nav-open", false);

  var chips = document.querySelectorAll("[data-filter]");
  var courses = document.querySelectorAll("[data-track]");
  var count = document.getElementById("course-count");

  function applyFilter(filter) {
    var shown = 0;
    courses.forEach(function (course) {
      var tracks = (course.getAttribute("data-track") || "").split(/\s+/);
      var visible = filter === "all" || tracks.indexOf(filter) !== -1;
      course.hidden = !visible;
      if (visible) shown += 1;
    });
    if (count) {
      count.textContent = shown === 1 ? "Showing 1 course" : "Showing " + shown + " courses";
    }
  }

  if (chips.length && courses.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (item) {
          item.setAttribute("aria-pressed", item === chip ? "true" : "false");
        });
        applyFilter(chip.getAttribute("data-filter"));
      });
    });
    applyFilter("all");
  }

  var form = document.getElementById("enquiry-form");
  if (!form) return;

  var courseSelect = document.getElementById("course");
  var requested = new URLSearchParams(window.location.search).get("course");
  if (courseSelect && requested) {
    Array.prototype.forEach.call(courseSelect.options, function (option) {
      if (option.value === requested) courseSelect.value = requested;
    });
  }

  var message = document.getElementById("message");
  var counter = document.getElementById("count");
  if (message && counter) {
    var updateCount = function () {
      counter.textContent = String(message.value.length);
    };
    message.addEventListener("input", updateCount);
    updateCount();
  }

  function showError(input, text) {
    var field = input.closest(".field");
    var error = field.querySelector(".error");
    if (text) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = text;
      field.classList.add("is-invalid");
    } else {
      input.removeAttribute("aria-invalid");
      error.textContent = "";
      field.classList.remove("is-invalid");
    }
  }

  function mobileDigits(value) {
    var digits = value.replace(/\D/g, "");
    if (digits.length === 12 && digits.indexOf("91") === 0) digits = digits.slice(2);
    if (digits.length === 11 && digits.indexOf("0") === 0) digits = digits.slice(1);
    return digits;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var student = document.getElementById("student");
    var parent = document.getElementById("parent");
    var mobile = document.getElementById("mobile");
    var grade = document.getElementById("grade");
    var course = document.getElementById("course");
    var batch = document.getElementById("batch");
    var school = document.getElementById("school");
    var consent = document.getElementById("consent");
    var banner = document.getElementById("form-banner");
    var invalid = [];

    showError(student, student.value.trim() ? "" : "Enter the student’s name.");
    showError(parent, parent.value.trim() ? "" : "Enter a parent or guardian name.");
    var digits = mobileDigits(mobile.value);
    showError(mobile, /^[6-9]\d{9}$/.test(digits) ? "" : "Enter a 10-digit Indian mobile number.");
    showError(grade, grade.value ? "" : "Choose the class the student is in.");
    showError(course, course.value ? "" : "Choose a course.");
    showError(batch, batch.value ? "" : "Choose a preferred batch.");
    showError(consent, consent.checked ? "" : "Please confirm we may contact you about this enquiry.");

    [student, parent, mobile, grade, course, batch, consent].forEach(function (input) {
      if (input.getAttribute("aria-invalid") === "true") invalid.push(input);
    });

    if (invalid.length) {
      banner.hidden = false;
      banner.textContent = "Please correct the highlighted fields.";
      invalid[0].focus();
      return;
    }

    banner.hidden = true;
    var courseLabel = course.options[course.selectedIndex].text;
    var gradeLabel = grade.options[grade.selectedIndex].text;
    var batchLabel = batch.options[batch.selectedIndex].text;
    var lines = [
      "Student enquiry for Aadhav Academy, T. Nagar",
      "Student: " + student.value.trim(),
      "Class: " + gradeLabel,
      "School: " + (school.value.trim() || "Not given"),
      "Course: " + courseLabel,
      "Parent / guardian: " + parent.value.trim(),
      "Mobile: " + digits,
      "Preferred batch: " + batchLabel,
      "Message: " + (message.value.trim() || "None")
    ];
    var url = waUrl(lines.join("\n"));
    var success = document.getElementById("form-success");
    var summary = document.getElementById("success-summary");
    var send = document.getElementById("send-whatsapp");
    summary.textContent = student.value.trim() + " · " + courseLabel + " · " + digits;
    send.href = url;
    form.hidden = true;
    success.hidden = false;
    success.focus();
    window.open(url, "_blank", "noopener");
  });

  var another = document.getElementById("another");
  if (another) {
    another.addEventListener("click", function () {
      form.reset();
      if (counter) counter.textContent = "0";
      form.querySelectorAll(".field").forEach(function (field) {
        field.classList.remove("is-invalid");
        var error = field.querySelector(".error");
        if (error) error.textContent = "";
      });
      form.querySelectorAll("[aria-invalid]").forEach(function (input) {
        input.removeAttribute("aria-invalid");
      });
      document.getElementById("form-success").hidden = true;
      form.hidden = false;
      document.getElementById("student").focus();
    });
  }
})();
