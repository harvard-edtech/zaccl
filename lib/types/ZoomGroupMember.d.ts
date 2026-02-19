/**
 * A single group member within a Zoom group
 * @author Gabe Abrams
 */
type ZoomGroupMember = {
    email: string;
    first_name: string;
    id: string;
    last_name: string;
    type: (1 | 2);
};
export default ZoomGroupMember;
