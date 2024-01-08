const NavBar = (props) => {
  return (
    <div className="flex min-h-16 w-full flex-row items-center border-b border-greylight bg-white">
      <div className="mx-2 flex w-full sm:mx-20">
        <h1 className="mr-auto font-oswald text-2xl leading-none text-greydark">
          Quik Quiz 💡
        </h1>
        <div
          className="ml-auto flex w-auto items-center"
          style={{
            opacity: props.opacity,
            transition: 'opacity 300ms ease-in-out',
          }}>
          {props.userData.name && (
            <>
              <h1
                className="text-base text-greytext"
                style={{
                  opacity: props.opacity,
                  transition: 'opacity 300ms ease-in-out',
                }}>
                {props.userData.name}
              </h1>
              <span className="mx-3 rounded bg-darkYellow px-2 py-1 leading-4 text-black">
                {props.userData.score}
              </span>
              <button
                onClick={() => props.handleLogout()}
                className="text-mustard underline">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
