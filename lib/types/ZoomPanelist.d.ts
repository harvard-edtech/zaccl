/**
 * Zoom panelist object
 * @author Gabe Abrams
 */
declare type ZoomPanelist = {
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
