const Categories = (props) => {
  return (
    <div className="mx-2 mb-2.5 flex items-center w-full rounded-xl bg-white sm:mx-20">
      <p className="font-oswald text-2xl p-6">Quiz Topic</p>
      {props.currentCategories && (
        <select
          className="h-8 w-full"
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
