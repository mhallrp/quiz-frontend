

const NavBar = (props) => {
  return (
    <div className="flex items-center w-full min-h-16 flex-row bg-white border-b border-greylight">
      <div className="flex mx-2 sm:mx-20 w-full">
      <h1 className="text-greydark mr-auto font-oswald text-2xl leading-none">
        Quik Quiz 💡
      </h1>
      <h1
        className="ml-auto text-base text-greytext"
        style={{
          opacity: props.opacity,
          transition: 'opacity 300ms ease-in-out',
        }}>
        {props.userData}
      </h1>
      </div>
    </div>
  );
};

export default NavBar;
