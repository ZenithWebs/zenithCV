import Elegant_poster from "../images/Elegant_poster.png";
import Creative_poster from '../images/Creative_poster.png'
import CorporatePro_poster from '../images/CorporatePro_poster.png'

export const images = {
    Elegant_poster,
    Creative_poster,
    CorporatePro_poster,
}

export const templates = [
  {
    id: "elegant",
    name: "Elegant",
    premium: false,
    image: Elegant_poster,
  },
  {
    id: "creative",
    name: "Creative",
    premium: false,
    image: Creative_poster,
  },
  {
    id: "corporate-pro",
    name: "Corporate pro",
    premium: true,
    image: CorporatePro_poster,
  },
];
