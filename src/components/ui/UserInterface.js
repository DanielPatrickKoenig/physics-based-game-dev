const UserInterface = ({scene}) => {
    const processAction = (data, type) => {
        // handle actions here
    }
    scene.setActionHandler(processAction);
    return (
        <div>
            <button>Test Button</button>
        </div>
    );
}
export default UserInterface;