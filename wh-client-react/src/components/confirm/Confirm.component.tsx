export const ConfirmModal = ({confirm, name}: any) => {

    function acceptOnClick() {

        confirm()
    }

    return (
        <div id="confirm_modal" className="modal">
            <div className="modal-content">
                <h4>Delete</h4>
                <p>Do you desire to delete the Warehouse '{name}' ?</p>
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn red" onClick={acceptOnClick}>Accept</a>
            </div>
        </div>
    )
}