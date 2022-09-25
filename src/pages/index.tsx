import { useState, useEffect } from "react";
import type { NextPage, GetServerSideProps } from "next"; 

interface CatCategory {
  id: number;
  name: string;
}

interface SearchCatImage {
  breeds: string[];
  categories: CatCategory[];
  id: string;
  url: string;
  width: number;
  height: number;
}

type SearchCatImageResponce = SearchCatImage[];

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = (await res.json()) as SearchCatImageResponce;
  return result[0];
}

interface IndexPageProps {
  initialCatImageUrl: string;
}



const IndexPage: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImage, setCatImage] = useState(initialCatImageUrl);

  const handleClick = async () => {
    const image = await fetchCatImage();
    setCatImage(image.url);
  };
  
  return (
    <div>
      <button onClick={ handleClick }>きょうのにゃんこ🐱</button>
      <div style={{ marginTop: 8 }}>
        <img src={catImage} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};

export default IndexPage;