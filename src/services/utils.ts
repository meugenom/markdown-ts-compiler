/**
 * This function initializes lazy loading for images with
 * IntersectionObserver
 */

export function InitLazyImages() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const images = document.querySelectorAll('.lazy');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(async (entry) => {
            if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                if (img.dataset.src) {
                    try {
                        const response = await fetch(img.dataset.src);
                        if (response.ok) {
                            const blob = await response.blob();
                            img.src = URL.createObjectURL(blob);
                            img.classList.remove('opacity-0');
                            
                            const loader = img.parentElement?.querySelector('.imageLoader') as HTMLElement;
                            if (loader) loader.style.display = 'none';
                        }
                    } catch (e) {
                        img.src = img.dataset.src;
                    }
                }
                obs.unobserve(img);
            }
        });
    });

    images.forEach(img => observer.observe(img));
}