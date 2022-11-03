/**
 * Zoom panelist object
 * @author Gabe Abrams
 */
type ZoomPanelist = {
  // Panelist's ID
  id: string,
  // Panelist's email. See Email address display rules for return value details
  email: string,
  // The panelist's full name.
  name: string,
  // Join URL
  join_url: string,
  // The virtual background's ID
  virtual_background_id?: string,
  // The name tag ID to bind.
  name_tag_id?: string,
  // The panelist's name to display in the name tag.
  name_tag_name?: string,
  // The pronouns to display in the name tag.
  name_tag_pronouns?: string,
  // The description for the name tag(for example, the person's title).
  name_tag_description?: string,
};

export default ZoomPanelist;
