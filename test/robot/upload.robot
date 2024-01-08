*** Settings ***
Resource            resource.robot

Suite Setup         Open And Configure Browser
Suite Teardown      Close Browser
Test Setup          Go To Main Page
Test Teardown       Remove Test Images


*** Test Cases ***
Valid image
    [Template]    User can upload single tif
    test_valid_1.tif
    test_valid_4.tiff
    test_valid_5.TIF

Invalid image
    [Template]    User cannot upload non-tif files
    test_invalid_1.jpg
    test_invalid_2.png

User can upload multiple tifs
    Choose Multiple Files
    ...    file-selector
    ...    ${INPUT_DIR}/test_valid_1.tif
    ...    ${INPUT_DIR}/test_valid_2.tif
    ...    ${INPUT_DIR}/test_valid_3.tif
    Sleep    0.5s
    Click Element    workspace-heading
    Element Should Contain    workspace    test_valid_1.tif
    Element Should Contain    workspace    test_valid_2.tif
    Element Should Contain    workspace    test_valid_3.tif


*** Keywords ***
User can upload single tif
    [Arguments]    ${TIF}
    Choose File    file-selector    ${INPUT_DIR}/${TIF}
    Sleep    0.5s
    Location Should Be    ${URL}/${TIF}
    Page Should Not Contain    Failed to load image
    Click Element    workspace-heading
    Element Should Contain    workspace    ${TIF}
    Go To Main Page

User cannot upload non-tif files
    [Arguments]    ${FILE}
    Choose File    file-selector    ${INPUT_DIR}/${FILE}
    Sleep    0.5s
    Location Should Be    ${URL}/
    Page Should Contain    Unsupported file type
    Element Should Not Contain    workspace    ${FILE}
