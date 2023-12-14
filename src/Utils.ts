/**
 * @autor: meugenom
 * @date: 14.12.2023
 */

class Utils {
    
      // lazy loading images
      static async lazyLoadImage(imageElement: HTMLImageElement) {
        
        const loaderElement = document.createElement('div');
        loaderElement.classList.add('imageLoader');
        imageElement?.parentNode?.insertBefore(loaderElement, imageElement);
      
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if ( img.dataset && img.dataset["src"]) {
                try {
                  loaderElement.style.display = 'block'; // Show the loader
      
                  const response = await fetch(img.dataset["src"]);
                  if (response.ok) {
                    const blob = await response.blob();
                    const objectURL = URL.createObjectURL(blob);
                    img.src = objectURL;
                  }
                } catch (error) {
                  console.error('Error loading image:', error);
                } finally {
                  loaderElement.style.display = 'none'; // Hide the loader
                }
              }
              observer.unobserve(img);
            }
          });
        });
      
        observer.observe(imageElement);
      }
  
      
      static async _lazyLoadImage(imageElement: HTMLImageElement) {
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset["src"]) {
                const response = await fetch(img.dataset["src"]);
                if (response.ok) {
                  const blob = await response.blob();
                  const objectURL = URL.createObjectURL(blob);
                  img.src = objectURL;
                }
              }
              observer.unobserve(img);
            }
          });
        });
      
        observer.observe(imageElement);
      }
    }
    
    export default Utils