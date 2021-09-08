class AssignedTo extends React.Component {
    render () {
        <Form.Group>
            <Form.Label>Assigned to</Form.Label>
            <Form.Control
                as='select'
                name='assignedTo'
                value={asset.assignedTo}
                onChange={onChange}
            >
                {usersList?.map((x) => (
                <option key={x._id} value={x._id}>
                    {x.name}
                </option>
                ))}
            </Form.Control>
        </Form.Group>
    }  
}