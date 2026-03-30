document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const messageBox = document.getElementById('formMessage');

  if (!form) return;

  const showMessage = (msg, isError = false) => {
    messageBox.textContent = msg;
    messageBox.style.display = 'block';
    
    // AREC styling matching the theme
    if (isError) {
      messageBox.style.backgroundColor = '#fef2f2';
      messageBox.style.color = '#ef4444';
      messageBox.style.border = '1px solid #fca5a5';
    } else {
      messageBox.style.backgroundColor = '#f0fdf4';
      messageBox.style.color = '#16a34a';
      messageBox.style.border = '1px solid #86efac';
    }

    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 8000);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Check current language
    const isAr = document.documentElement.lang === 'ar';

    // Update button state
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = isAr ? 'جاري الإرسال...' : 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    submitBtn.style.cursor = 'not-allowed';

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        showMessage(isAr ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : 'Your message has been sent successfully! We will contact you soon.');
        form.reset();
      } else {
        showMessage(isAr ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى لاحقاً.' : 'An error occurred. Please try again later.', true);
      }
    } catch (error) {
      console.error('Submission error:', error);
      showMessage(isAr ? 'حدث خطأ بالاتصال. يرجى التأكد من اتصالك بالإنترنت.' : 'Connection error. Please check your internet connection.', true);
    } finally {
      // Restore button state
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
    }
  });
});
