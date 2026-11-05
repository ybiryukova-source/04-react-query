import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { MouseEvent } from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function MovieModal({
  movie,
  onClose,
}: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const handleBackdropClick = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const imagePath = movie.backdrop_path || movie.poster_path;

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={movie.title}
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        {imagePath && (
          <img
            src={`${IMAGE_BASE_URL}${imagePath}`}
            alt={movie.title}
            className={css.image}
          />
        )}

        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview || "No description available."}</p>
          <p>
            <strong>Release Date:</strong>{" "}
            {movie.release_date || "Unknown"}
          </p>
          <p>
            <strong>Rating:</strong>{" "}
            {movie.vote_average.toFixed(1)}/10
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
