/**
 * VETRI APEX ACADEMY - MAIN JAVASCRIPT
 * Comprehensive interactive script for mobile navigation, course filtering,
 * scholarship calculation, branch selector, form validation & WhatsApp integration.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Mobile Menu Drawer Navigation ---
  const mobileToggle = document.getElementById('mobileToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeAllModals();
    }
  });


  // --- 2. Sticky Header & Scroll Spy ---
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy active link update
    let currentSection = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.offsetHeight;
      if (scrollPosition >= secTop && scrollPosition < secTop + secHeight) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });


  // --- 3. Course Filter Tabs ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // --- 4. Course "Enquire Now" Auto-Select ---
  const enrolButtons = document.querySelectorAll('.enrol-action');
  const targetCourseSelect = document.getElementById('targetCourse');

  enrolButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseName = btn.getAttribute('data-course');
      if (targetCourseSelect) {
        // Find matching option
        for (let i = 0; i < targetCourseSelect.options.length; i++) {
          if (targetCourseSelect.options[i].text.includes(courseName) || targetCourseSelect.options[i].value.includes(courseName)) {
            targetCourseSelect.selectedIndex = i;
            break;
          }
        }
      }
      showToast(`Selected course: ${courseName}. Please complete your enquiry below.`);
    });
  });


  // --- 5. Syllabus Download Modal Simulator ---
  const syllabusBtns = document.querySelectorAll('.syllabus-btn');
  const syllabusModal = document.getElementById('syllabusModal');
  const syllabusModalClose = document.getElementById('syllabusModalClose');
  const syllabusCourseTitle = document.getElementById('syllabusCourseTitle');
  const syllabusForm = document.getElementById('syllabusDownloadForm');
  let selectedSyllabusCourse = 'Course';

  syllabusBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedSyllabusCourse = btn.getAttribute('data-course') || 'Academic Program';
      if (syllabusCourseTitle) {
        syllabusCourseTitle.textContent = `${selectedSyllabusCourse} - Syllabus & Brochure`;
      }
      syllabusModal.classList.add('active');
    });
  });

  if (syllabusModalClose) {
    syllabusModalClose.addEventListener('click', () => {
      syllabusModal.classList.remove('active');
    });
  }

  if (syllabusForm) {
    syllabusForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const mobileInput = document.getElementById('sylMobile');
      const mobileVal = mobileInput.value.trim();

      if (!/^[6-9]\d{9}$/.test(mobileVal)) {
        showToast('Please enter a valid 10-digit mobile number.', 'error');
        return;
      }

      syllabusModal.classList.remove('active');
      mobileInput.value = '';

      // Create a mock syllabus text file for instant download
      const syllabusContent = `========================================================\n` +
        `VETRI APEX ACADEMY CHENNAI - 2026-27 ADMISSION BROCHURE\n` +
        `Course: ${selectedSyllabusCourse}\n` +
        `Helpline: +91 98401 23456 | admissions@vetriapex.edu.in\n` +
        `Campuses: Anna Nagar, T. Nagar, Tambaram, Adyar\n` +
        `========================================================\n\n` +
        `KEY HIGHLIGHTS:\n` +
        `- 100% NCERT / NTA Pattern Alignment\n` +
        `- Master Faculty from IIT Madras & AIIMS\n` +
        `- Daily 30-Question Practice Papers (DPP)\n` +
        `- Weekly Sunday OMR All-Tamil Nadu Benchmark Tests\n` +
        `- Air-Conditioned 24/7 Library & CBT Lab Access\n` +
        `- Hostel tie-up available for outstation Tamil Nadu students.\n\n` +
        `For batch timings and fee concession details, visit nearest campus or WhatsApp +91 98401 23456.\n`;

      const blob = new Blob([syllabusContent], { type: 'text/plain;charset=utf-8' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `Vetri_Apex_${selectedSyllabusCourse.replace(/[^a-zA-Z0-9]/g, '_')}_Brochure.txt`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      showToast(`Brochure downloaded! Syllabus has also been queued to WhatsApp (${mobileVal}).`, 'success');
    });
  }


  // --- 6. V-SAT Scholarship Estimator ---
  const calcScore = document.getElementById('calcScore');
  const scoreValue = document.getElementById('scoreValue');
  const scholarshipPct = document.getElementById('scholarshipPct');
  const scholarshipNote = document.getElementById('scholarshipNote');

  const updateScholarship = () => {
    if (!calcScore || !scoreValue || !scholarshipPct) return;
    const score = parseInt(calcScore.value, 10);
    scoreValue.textContent = `${score}%`;

    let waiver = '25% Fee Waiver';
    let note = 'Eligible for Regular Batch with Free Study Kits.';

    if (score >= 95) {
      waiver = '100% Full Tuition Waiver';
      note = 'Super-Achiever Ranker Merit Batch! Free Hostel Assistance & 1-on-1 Mentorship.';
    } else if (score >= 90) {
      waiver = '75% Tuition Fee Waiver';
      note = 'Merit Batch Qualifier with Free All-India Test Series & CBT Lab Access.';
    } else if (score >= 80) {
      waiver = '50% Tuition Fee Waiver';
      note = 'Honors Batch Qualifier with NCERT Master Books & Daily DPPs included.';
    } else if (score >= 70) {
      waiver = '35% Tuition Fee Waiver';
      note = 'Special Foundation Concession for early Chennai campus registrations.';
    }

    scholarshipPct.textContent = waiver;
    scholarshipNote.textContent = note;
  };

  if (calcScore) {
    calcScore.addEventListener('input', updateScholarship);
    updateScholarship();
  }


  // --- 7. Chennai Campus Location Switcher ---
  const campusTabBtns = document.querySelectorAll('.campus-tab-btn');
  const campusCards = document.querySelectorAll('.campus-card');

  campusTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      campusTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const campusKey = btn.getAttribute('data-campus');
      campusCards.forEach(card => {
        card.classList.remove('active');
        if (card.id === `campus-${campusKey}`) {
          card.classList.add('active');
        }
      });
    });
  });


  // --- 8. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQs
      faqItems.forEach(i => i.classList.remove('active'));

      // If wasn't active, toggle on
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });


  // --- 9. Modal Management Helpers ---
  const successModal = document.getElementById('successModal');
  const modalClose = document.getElementById('modalClose');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const modalStudentName = document.getElementById('modalStudentName');
  const modalStudentPhone = document.getElementById('modalStudentPhone');
  const modalRefId = document.getElementById('modalRefId');
  const modalWaDirectLink = document.getElementById('modalWaDirectLink');

  const closeAllModals = () => {
    if (successModal) successModal.classList.remove('active');
    if (syllabusModal) syllabusModal.classList.remove('active');
  };

  if (modalClose) modalClose.addEventListener('click', closeAllModals);
  if (modalOkBtn) modalOkBtn.addEventListener('click', closeAllModals);

  // Close modals when clicking outside dialog
  [successModal, syllabusModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeAllModals();
        }
      });
    }
  });

  const launchSuccessModal = (name, phone, course, campus) => {
    const refCode = `#VA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    if (modalStudentName) modalStudentName.textContent = name;
    if (modalStudentPhone) modalStudentPhone.textContent = phone;
    if (modalRefId) modalRefId.textContent = refCode;

    // Create tailored WhatsApp Direct link
    if (modalWaDirectLink) {
      const text = encodeURIComponent(
        `Hello Vetri Apex Academy,\n` +
        `I just submitted an enquiry online.\n` +
        `Ref ID: ${refCode}\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Course: ${course || 'NEET/JEE'}\n` +
        `Preferred Campus: ${campus || 'Anna Nagar'}\n` +
        `Please send me the admission brochure and demo class schedule.`
      );
      modalWaDirectLink.href = `https://wa.me/919840123456?text=${text}`;
    }

    successModal.classList.add('active');
  };


  // --- 10. Comprehensive Form Validation & Submission ---
  const admissionForm = document.getElementById('admissionForm');

  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const sName = document.getElementById('studentName');
      const sPhone = document.getElementById('studentPhone');
      const sEmail = document.getElementById('studentEmail');
      const sCourse = document.getElementById('targetCourse');
      const sCampus = document.getElementById('preferredCampus');
      const sGrade = document.getElementById('currentGrade');
      const pName = document.getElementById('parentName');
      const sSchool = document.getElementById('schoolCollege');
      const sQuery = document.getElementById('studentQuery');

      // Validate Name
      if (!sName.value.trim() || sName.value.trim().length < 3) {
        setFieldError(sName, true);
        isValid = false;
      } else {
        setFieldError(sName, false);
      }

      // Validate Phone (Indian 10-digit)
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(sPhone.value.trim())) {
        setFieldError(sPhone, true);
        isValid = false;
      } else {
        setFieldError(sPhone, false);
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sEmail.value.trim())) {
        setFieldError(sEmail, true);
        isValid = false;
      } else {
        setFieldError(sEmail, false);
      }

      // Validate Course
      if (!sCourse.value) {
        setFieldError(sCourse, true);
        isValid = false;
      } else {
        setFieldError(sCourse, false);
      }

      // Validate Campus
      if (!sCampus.value) {
        setFieldError(sCampus, true);
        isValid = false;
      } else {
        setFieldError(sCampus, false);
      }

      if (!isValid) {
        showToast('Please correct highlighted fields before submitting.', 'error');
        return;
      }

      // Store in LocalStorage for demo & verification persistence
      const enquiryData = {
        name: sName.value.trim(),
        phone: sPhone.value.trim(),
        email: sEmail.value.trim(),
        parent: pName ? pName.value.trim() : '',
        course: sCourse.value,
        campus: sCampus.value,
        grade: sGrade ? sGrade.value : '',
        school: sSchool ? sSchool.value.trim() : '',
        query: sQuery ? sQuery.value.trim() : '',
        timestamp: new Date().toISOString()
      };

      try {
        const existing = JSON.parse(localStorage.getItem('vetri_enquiries') || '[]');
        existing.push(enquiryData);
        localStorage.setItem('vetri_enquiries', JSON.stringify(existing));
      } catch (err) {
        console.warn('LocalStorage save error:', err);
      }

      // Launch Success dialog
      launchSuccessModal(enquiryData.name, enquiryData.phone, enquiryData.course, enquiryData.campus);

      // Reset form
      admissionForm.reset();
      showToast('Enquiry received! Counselor notified.', 'success');
    });
  }

  function setFieldError(inputEl, isError) {
    const parentGroup = inputEl.closest('.form-group');
    if (!parentGroup) return;
    if (isError) {
      parentGroup.classList.add('has-error');
    } else {
      parentGroup.classList.remove('has-error');
    }
  }


  // --- 11. Hero Quick Callback Form ---
  const heroQuickForm = document.getElementById('heroQuickForm');
  if (heroQuickForm) {
    heroQuickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const hqName = document.getElementById('hqName').value.trim();
      const hqPhone = document.getElementById('hqPhone').value.trim();
      const hqTarget = document.getElementById('hqTarget').value;
      const hqCampus = document.getElementById('hqCampus').value;

      if (!hqName || hqName.length < 2) {
        showToast('Please enter your full name.', 'error');
        return;
      }

      if (!/^[6-9]\d{9}$/.test(hqPhone)) {
        showToast('Please enter a valid 10-digit mobile number.', 'error');
        return;
      }

      launchSuccessModal(hqName, hqPhone, hqTarget, hqCampus);
      heroQuickForm.reset();
    });
  }


  // --- 12. Floating WhatsApp Tooltip Behavior ---
  const floatingWhatsapp = document.getElementById('floatingWhatsapp');
  const whatsappTooltip = document.getElementById('whatsappTooltip');
  const tooltipClose = document.getElementById('tooltipClose');

  if (whatsappTooltip && tooltipClose) {
    // Show tooltip after 2.5 seconds if user hasn't dismissed it
    const dismissed = sessionStorage.getItem('vetri_tooltip_dismissed');
    if (!dismissed) {
      setTimeout(() => {
        whatsappTooltip.style.display = 'flex';
      }, 2500);
    } else {
      whatsappTooltip.style.display = 'none';
    }

    tooltipClose.addEventListener('click', (e) => {
      e.stopPropagation();
      whatsappTooltip.style.display = 'none';
      sessionStorage.setItem('vetri_tooltip_dismissed', 'true');
    });
  }


  // --- 13. Toast Notification Utility ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-triangle-exclamation';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 4000);
  }

});
