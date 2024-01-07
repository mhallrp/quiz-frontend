const NavBar = (props) => {
  return (
    <div className="border-greylight flex min-h-16 w-full flex-row items-center border-b bg-white">
      <div className="mx-2 flex w-full items-center sm:mx-20">
        <h1 className="text-greydark mr-auto font-oswald text-2xl leading-none">
          Quik Quiz 💡
        </h1>
        {props.userData.name && (
          <div className="ml-auto flex w-auto">
            <h1
              className="text-greytext text-base"
              style={{
                opacity: props.opacity,
                transition: 'opacity 300ms ease-in-out',
              }}>
              {props.userData.name}
            </h1>
            <div className="mx-3 rounded bg-darkYellow px-2 py-1 text-black">
              {props.userData.score}
            </div>
            <button
              onClick={() => props.handleLogout()}
              className="text-mustard underline">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
