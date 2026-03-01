document.addEventListener('DOMContentLoaded', () => {
    
    // 1. TELA DE CARREGAMENTO (Splash Screen)
    const splashScreen = document.getElementById('splash-screen');
    const animatedElements = document.querySelectorAll('header, section, main, footer');
    
    setTimeout(() => {
        if(splashScreen) splashScreen.classList.add('hide-splash');
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

    if (btnQr && qrModal && closeQr) {
        btnQr.addEventListener('click', () => qrModal.classList.add('active'));
        closeQr.addEventListener('click', () => qrModal.classList.remove('active'));
        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) qrModal.classList.remove('active');
        });
    }

    // 4. MODAL SERVIÇOS
    const btnServices = document.getElementById('btn-services');
    const servicesModal = document.getElementById('services-modal');
    const closeServices = document.getElementById('close-services');

    if (btnServices && servicesModal && closeServices) {
        btnServices.addEventListener('click', () => servicesModal.classList.add('active'));
        closeServices.addEventListener('click', () => servicesModal.classList.remove('active'));
        servicesModal.addEventListener('click', (e) => {
            if (e.target === servicesModal) servicesModal.classList.remove('active');
        });
    }

    // 5. GUARDAR CONTACTO (vCard)
    const btnVcard = document.getElementById('btn-vcard');
    if (btnVcard) {
        btnVcard.addEventListener('click', () => {
            const vcardData = `BEGIN:VCARD\nVERSION:3.0\nFN:Beatriz Siqueira\nORG:Beatriz Contabilidade\nTITLE:Contabilista (CRC SP-355917/O)\nTEL;TYPE=WORK,VOICE:+5512991594055\nEMAIL;TYPE=PREF,INTERNET:bea.a_siqueira@hotmail.com\nEND:VCARD`;
            
            const blob = new Blob([vcardData], { type: 'text/vcard' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            
            a.style.display = 'none';
            a.href = url;
            a.download = 'Beatriz_Contabilidade.vcf';
            document.body.appendChild(a);
            a.click();
            
            window.URL.revokeObjectURL(url);
            // Uso de alerta nativo
            alert('Contato Salvo com Sucesso!');
        });
    }

    // 6. PARTILHAR / SHARE
    const btnShare = document.getElementById('btn-share');
    if (btnShare) {
        btnShare.addEventListener('click', async () => {
            const shareData = {
                title: 'Beatriz - Contabilidade',
                text: 'Conheça os serviços de contabilidade da Beatriz!',
                url: window.location.href
            };
            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    navigator.clipboard.writeText(window.location.href);
                    // Uso de alerta nativo
                    alert('Link do cartão copiado com sucesso!');
                }
            } catch (err) { console.log('Cancelado'); }
        });
    }

    // 7. COPIAR CHAVE PIX
    const pixButton = document.getElementById('btn-pix');
    if (pixButton) {
        pixButton.addEventListener('click', () => {
            const chavePix = pixButton.getAttribute('data-chave');
            navigator.clipboard.writeText(chavePix).then(() => {
                if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
                // Uso de alerta nativo
                alert('Chave PIX copiada com sucesso!');
            });
        });
    }

    // 8. FEEDBACK TÁTIL GERAL
    const allButtons = document.querySelectorAll('a, button');
    allButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (navigator.vibrate) {
                navigator.vibrate(15);
            }
        });
    });
});