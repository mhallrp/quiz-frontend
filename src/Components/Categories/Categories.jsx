const Categories = (props) => {
  return (
    <div className=" mb-2.5 flex w-full items-center rounded-xl bg-white ">
      <p className="m-6 font-oswald text-2xl">Quiz Topic</p>
      {props.currentCategories && (
        <select
          className="mr-6 mt-1 w-fit h-8 rounded border border-greylight bg-white pl-2 text-greytext"
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
