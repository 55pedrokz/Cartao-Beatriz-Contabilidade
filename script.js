document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ECRÃ DE CARREGAMENTO (Splash Screen)
    const splashScreen = document.getElementById('splash-screen');
    const animatedElements = document.querySelectorAll('header, section, main, footer');
    
    setTimeout(() => {
        splashScreen.classList.add('hide-splash');
        animatedElements.forEach(el => el.classList.add('content-loaded'));
    }, 1200);

    // 2. MÁGICA DO PÓ DE OURO (Gerador de Partículas)
    function createParticle() {
        const container = document.getElementById('particles-container');
        if (!container) return;

        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 3 + 1; 
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        
        const duration = Math.random() * 7 + 5; 
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);
        setTimeout(() => particle.remove(), duration * 1000);
    }
    setInterval(createParticle, 400);

    // 3. MODAL QR CODE
    const btnQr = document.getElementById('btn-qr');
    const qrModal = document.getElementById('qr-modal');
    const closeQr = document.getElementById('close-qr');

    if (btnQr && qrModal) {
        btnQr.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(30);
            qrModal.classList.add('active');
        });

        closeQr.addEventListener('click', () => {
            qrModal.classList.remove('active');
        });

        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) qrModal.classList.remove('active');
        });
    }

    // 3.5 MODAL DE SERVIÇOS
    const btnServices = document.getElementById('btn-services');
    const servicesModal = document.getElementById('services-modal');
    const closeServices = document.getElementById('close-services');

    if (btnServices && servicesModal) {
        btnServices.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(30);
            servicesModal.classList.add('active');
        });

        closeServices.addEventListener('click', () => {
            servicesModal.classList.remove('active');
        });

        servicesModal.addEventListener('click', (e) => {
            if (e.target === servicesModal) servicesModal.classList.remove('active');
        });
    }

    // 4. GUARDAR CONTACTO (vCard)
    const btnVcard = document.getElementById('btn-vcard');
    if (btnVcard) {
        btnVcard.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(30);
            
            const vcardData = `BEGIN:VCARD\nVERSION:3.0\nFN:Beatriz Siqueira\nORG:Beatriz Contabilidade\nTITLE:Contabilista (CRC SP-355917/O)\nTEL;TYPE=WORK,VOICE:+5512991594055\nEMAIL;TYPE=PREF,INTERNET:bia.a_siqueira@hotmail.com\nEND:VCARD`;
            
            const blob = new Blob([vcardData], { type: 'text/vcard' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            
            a.style.display = 'none';
            a.href = url;
            a.download = 'Beatriz_Contabilidade.vcf';
            document.body.appendChild(a);
            a.click();
            
            window.URL.revokeObjectURL(url);
            showToast('<i class="fas fa-check-circle"></i> Salvo na agenda!');
        });
    }

    // 5. PARTILHAR
    const btnShare = document.getElementById('btn-share');
    if (btnShare) {
        btnShare.addEventListener('click', async () => {
            if (navigator.vibrate) navigator.vibrate(30);
            const shareData = {
                title: 'Beatriz - Contabilidade',
                text: 'Acesse ao meu Cartão Digital de Contabilidade',
                url: window.location.href
            };
            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    navigator.clipboard.writeText(window.location.href);
                    showToast('<i class="fas fa-link"></i> Link copiado!');
                }
            } catch (err) { console.log('Cancelado'); }
        });
    }

    // 6. COPIAR CHAVE PIX
    const pixButton = document.getElementById('btn-pix');
    if (pixButton) {
        pixButton.addEventListener('click', () => {
            const chavePix = pixButton.getAttribute('data-chave');
            navigator.clipboard.writeText(chavePix).then(() => {
                if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
                showToast('<i class="fas fa-check-double"></i> Chave PIX copiada!');
            });
        });
    }

    // 7. TOAST NOTIFICATION CORRIGIDA (Aparece e Desaparece)
    let toastTimeout; 

    function showToast(htmlContent) {
        const toast = document.getElementById('toast');
        toast.innerHTML = htmlContent;
        
        clearTimeout(toastTimeout);
        
        toast.classList.add('show');
        
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 8. FEEDBACK TÁTIL GERAL
    const allButtons = document.querySelectorAll('a, button');
    allButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(15);
        });
    });

});