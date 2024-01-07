const NavBar = (props) => {
  return (
    <div className="border-greylight flex min-h-16 w-full flex-row items-center border-b bg-white">
      <div className="mx-2 flex w-full sm:mx-20">
        <h1 className="text-greydark mr-auto font-oswald text-2xl leading-none">
          Quik Quiz 💡
        </h1>
        <h1
          className="text-greytext ml-auto text-base"
          style={{
            opacity: props.opacity,
            transition: 'opacity 300ms ease-in-out',
          }}>
          {props.userData.name}
        </h1>
        <div className="rounded bg-darkYellow text-black">
          {props.userData.score}
        </div>
        <button className="text-mustard underline">Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
