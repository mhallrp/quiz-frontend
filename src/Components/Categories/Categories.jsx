const Categories = (props) => {
  return (
    <div className=" mb-2.5 flex w-full items-center rounded-xl bg-white ">
      <p className="m-6 font-oswald text-2xl">Quiz Topic</p>
      {props.currentCategories && (
        <select
          className="flex pl-2 h-8 mt-1 mr-6 grow rounded border border-greylight bg-white text-greytext"
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
