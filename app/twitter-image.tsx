// Twitter card reuses the OG image visual. Next.js requires the runtime
// + size + contentType to be declared in-file (it can't follow a
// re-export), so we duplicate the metadata and import only the renderer.
import Image, {
  alt as ogAlt,
  size as ogSize,
  contentType as ogContentType,
} from "./opengraph-image";

export const runtime = "edge";
export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default Image;
