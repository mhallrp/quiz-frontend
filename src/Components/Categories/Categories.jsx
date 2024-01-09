import { useEffect, useState } from "react";
import { useData } from "../../Model/dataLogic";

const Categories = (props) => {
  const [categories, setCategories] = useState(["General knowledge"]);
  const { getCategories } = useData();

  useEffect(() => {
    const initializeCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    initializeCategories();
  }, []);

  return (
    <div className="mb-2.5 flex  w-full items-center  rounded-xl bg-white ">
      <p className="m-6 flex-shrink-0 font-oswald text-2xl">Quiz Topic</p>
      <select
        className="ml-auto mr-6 mt-1 h-8 w-full rounded border border-greylight bg-white pl-2 text-greytext"
        onChange={(e) => props.setSelectedCategory(e.target.value)}
        defaultValue="">
        <option disabled value="">
          Select a category
        </option>
        {categories.map((category, index) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Categories;
