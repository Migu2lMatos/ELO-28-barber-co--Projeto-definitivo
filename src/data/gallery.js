export const chapters = [
  {
    title: "O Espaço",
    photos: [
      { src: "/media/barbearia/barbearia-interior-2.webp", alt: "Vista ampla do interior da barbearia com iluminação hexagonal e espelhos" },
      { src: "/media/barbearia/barbearia-interior-1.webp", alt: "Interior da barbearia com iluminação hexagonal em LED" },
      { src: "/media/barbearia/barbearia-filosofia-elo.webp", alt: "Parede com a filosofia da marca ELO28" },
      { src: "/media/barbearia/barbearia-logotipo-neon.webp", alt: "Logótipo neon ELO28 Barber & Co. na parede da barbearia" },
    ],
  },
  {
    title: "A Nossa Cultura",
    photos: [
      { src: "/media/barbearia/barbearia-equipa-acao.webp", alt: "Barbeiros da ELO28 a trabalhar num cliente" },
      { src: "/media/barbearia/barbearia-formacao.webp", alt: "Sessão de formação técnica na barbearia ELO28" },
      { src: "/media/barbearia/barbearia-fachada.webp", alt: "Fachada exterior da ELO28 Barber & Co. em Rio de Mouro" },
      { src: "/media/barbearia/barbearia-equipa-grupo.webp", alt: "Equipa da ELO28 Barber & Co. reunida no espaço" },
    ],
  },
  {
    title: "Resultados",
    dense: true,
    photos: Array.from({ length: 15 }, (_, i) => {
      const n = String(i + 1).padStart(2, "0");
      return { src: `/media/cortes/cortes-${n}.webp`, alt: `Corte de cabelo realizado pela equipa ELO28 Barber & Co. — trabalho ${n}` };
    }),
  },
];
