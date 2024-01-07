const NavBar = (props) => {
  return (
    <div className="flex z-10 align-middle relative w-full h-16 flex-row shadow-navbar bg-white">
      <h1 className="text-greydark ml-2 mr-auto font-oswald text-xl leading-none sm:ml-20">
        Quik Quiz 💡
      </h1>
      <h1
        className="sm:mr:20 ml-auto mr-2 text-xl"
        style={{
          opacity: props.opacity,
          transition: 'opacity 300ms ease-in-out',
        }}>
        {props.userData}
      </h1>
    </div>
  );
};

export default NavBar;
