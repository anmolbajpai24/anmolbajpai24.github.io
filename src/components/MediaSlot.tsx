import { isVideo, mediaUrl } from "../lib/media";

interface Props {
  /** Path inside src/assets/media, e.g. "melee-madness/shop.webp". */
  name?: string;
  alt: string;
  /** CSS aspect ratio, e.g. "16 / 10" or "9 / 19.5" for a phone screen. */
  ratio?: string;
  caption?: string;
  className?: string;
  /** Poster image name (inside src/assets/media) shown before a video plays. */
  poster?: string;
  /** Show native video controls (for longer videos a visitor may want to scrub). */
  controls?: boolean;
}

export default function MediaSlot({
  name,
  alt,
  ratio = "16 / 10",
  caption,
  className = "",
  poster,
  controls = false,
}: Props) {
  const url = mediaUrl(name);
  const body = url ? (
    name && isVideo(name) ? (
      <video
        src={url}
        aria-label={alt}
        poster={mediaUrl(poster)}
        autoPlay
        muted
        loop
        playsInline
        controls={controls}
        preload="metadata"
      />
    ) : (
      <img src={url} alt={alt} loading="lazy" decoding="async" />
    )
  ) : (
    <div className="media-placeholder" role="img" aria-label={alt}>
      <span className="mono">{name ?? "media"}</span>
    </div>
  );

  return (
    <figure className={`media ${className}`}>
      <div className="media-frame" style={{ aspectRatio: ratio }}>
        {body}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
