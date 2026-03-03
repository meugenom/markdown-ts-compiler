declare class Utils {
    static lazyLoadImage(imageElement: HTMLImageElement): Promise<void>;
    static _lazyLoadImage(imageElement: HTMLImageElement): Promise<void>;
}
export default Utils;
