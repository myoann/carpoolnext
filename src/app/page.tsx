import Image from "next/image";
import SearchForm from "@/components/SearchForm";

import "./homePage.css";

const todayDate = new Date().toISOString().substring(0, 10);

const Home = () => {
  return (
    <main className="main">
      <div className="coordinatesExamples">
        <span>A few examples of coordinates you can use</span>
        <span>Paris, France: 48.866667,2.333333</span>
        <span>Toulouse, France: 43.604652,1.444209</span>
        <span>Nice, France: 43.710172,7.261953</span>
      </div>

      <SearchForm />

      <div className="existingSearch">
        Or try with an existing search:
        <a
          href={`/search?fc=48.864716,2.349014&tc=51.509865,-0.118092&db=${todayDate}`}
          className="existingSearchLink"
        >
          <span>Paris to London today</span>

          <Image
            src="/search.svg"
            alt="Search"
            width={24}
            height={24}
            className="searchIcon"
          />
        </a>
      </div>
    </main>
  );
};

export default Home;
