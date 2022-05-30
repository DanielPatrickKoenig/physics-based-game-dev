const UserInterface = ({scene}) => {
    const processAction = (data, type) => {
        alert(`data: ${data}, type: ${type}`);
    }
    scene.setActionHandler(processAction);
    return (
        <div>
            <button>Test Button</button>
        </div>
    );
}
export default UserInterface;