const Categories = (props) => {
  return (
    <div className="flex mb-2.5  w-full items-center  rounded-xl bg-white ">
      <p className="m-6 font-oswald text-2xl flex-shrink-0">Quiz Topic</p>
      {props.currentCategories && (
        <select
          className="mr-6 ml-auto mt-1 h-8 w-full rounded border border-greylight bg-white pl-2 text-greytext"
          onChange={(e) => props.setSelectedCategory(e.target.value)}>
          {props.currentCategories.map((e, index) => {
            return (
              <option key={index} value={e.id}>
                {e.name}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
};

export default Categories;
