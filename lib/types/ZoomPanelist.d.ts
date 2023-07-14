/**
 * Zoom panelist object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/webinarPanelists}
 * @author Gabe Abrams
 */
type ZoomPanelist = {
    id: string;
    email: string;
    name: string;
    join_url: string;
    virtual_background_id?: string;
    name_tag_id?: string;
    name_tag_name?: string;
    name_tag_pronouns?: string;
    name_tag_description?: string;
};
export default ZoomPanelist;
