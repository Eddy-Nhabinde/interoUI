import React, { useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { useFetch } from '../../../hooks/useFetch';
import { Menu } from '@mui/material';
import OUSelection from './ouSelection/ouSelection';

const TreeComponent = ({ selectedOu, setSelectedOu }) => {
    const { data, isFetching } = useFetch('api/mfl/treeview')
    let treeNodes = []
    const [expanded, setExpanded] = useState([]);
    const [checked, setChecked] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function changeKey(obj, eliminar) {
        if (eliminar)
            delete obj['organisationUnitGroups']

        obj['label'] = obj['name']
        obj['value'] = obj['id']
    }

    if (data)
        if (data.organisationUnits) {
            changeKey(data.organisationUnits[0])
            data.organisationUnits[0].children.map((val) => {
                changeKey(val)
                val.children.map((val2) => {
                    changeKey(val2)
                    val2.children.map((val3) => {
                        changeKey(val3, true)
                    })
                })
            })
            treeNodes = [data.organisationUnits[0]]
        }

    const onCheck = (e, v) => {
        setChecked([v.value]);
        setSelectedOu({ label: v.label, childrens: v.children, level: v.level, id: v.value });
        handleClose()
    };

    const cancelSelection = () => {
        setChecked([]);
        setSelectedOu("");
    }

    return (
        <>
            <OUSelection isFetching={isFetching} cancelSelection={cancelSelection} handleClickMenu={handleClickMenu} selectedOu={selectedOu} />
            <Menu
                style={{ borderRadius: "100px" }}
                onClose={handleClose}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div style={{ margin: "5px" }} >
                    <CheckboxTree
                        icons={{
                            check: <i class="material-icons">check_box</i>,
                            uncheck: <i class="material-icons">check_box_outline_blank</i>,
                            halfCheck: <i class="material-icons">indeterminate_check_box</i>,
                            expandClose: <i class="material-icons">keyboard_arrow_right</i>,
                            expandOpen: <i class="material-icons">expand_more</i>,
                            expandAll: <i class="material-icons">expand_more</i>,
                            collapseAll: <i class="material-icons">expand_more</i>,
                            parentClose: <i class="material-icons">folder</i>,
                            parentOpen: <i class="material-icons">folder_open</i>,
                            leaf: <i class="material-icons">folder</i>
                        }}
                        nodes={treeNodes}
                        checked={checked}
                        nativeCheckboxes
                        expanded={expanded}
                        onCheck={(e, v) => onCheck(e, v)}
                        onExpand={expanded => setExpanded(expanded)}
                    />
                </div>
            </Menu>
        </>
    );
}
export { TreeComponent };