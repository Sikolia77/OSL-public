import { useEffect, useState } from "react";
import { myData } from "../../assets/data/landing";
import Pagination from "../Utils/pagination";
import Thumbnail from "./Thumbnail";

export default function MapCategory(props) {
  const [data, setData] = useState(null);
  const [offset, setOffset] = useState(0);

  let prg = "";

  switch (props.category) {
    case "Thematic Map":
      prg = myData[1].p;
      break;
    case "Topo Map":
      prg = myData[2].p;
      break;
    case "Basemap":
      prg = myData[3].p;
      break;
    case "World Data":
      prg = myData[4].p;
      break;
    default:
      break;
  }

  useEffect(() => {
    fetch(`/api/gis/category/${props.category}/${offset}`)
      .then((res) => {
        if (res.ok) return res.json();
        else throw Error("");
      })
      .then((data) => {
        setData(data);
      })
      .catch((e) => {});
  },[offset]);

  function scrollPages(offset) {
    setOffset(offset);
}

  return (
    <div className="cat">
      <h1>{props.category}</h1>
      <p>{prg}</p>
      {data && (
        <>
          <div className="mapcategory">
            {data?.length > 0 &&
              data.map((item) => {
                return <Thumbnail item={item} />;
              })}
          </div>
          <Pagination
            count={data?.length}
            scrollPages={scrollPages}
            page={offset}
          />
        </>
      )}
    </div>
  )
}
