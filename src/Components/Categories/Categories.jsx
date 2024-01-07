const Categories = (props) => {
  return (
    <div className="mx-2 mb-2.5 flex w-full items-center rounded-xl bg-white sm:mx-20">
      <p className="flex-shrink-0 p-6 font-oswald text-2xl">Quiz Topic</p>
      {props.currentCategories && (
        <select
          className="border-greylight h-8 w-full flex-grow rounded border bg-white"
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
