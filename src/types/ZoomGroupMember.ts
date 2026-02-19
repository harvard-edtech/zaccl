/**
 * A single group member within a Zoom group
 * @author Gabe Abrams
 */
type ZoomGroupMember = {
  // User's email address
  email: string,
  // First name of the user
  first_name: string,
  // Unique Identifier of the user
  id: string,
  // Last name of the user
  last_name: string,
  // User type:
  //   1 - Basic
  //   2 - Licensed
  type: (1 | 2),
};

export default ZoomGroupMember;
