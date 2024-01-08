*** Settings ***
Library     OperatingSystem
Library     SeleniumLibrary
Library     ./TestLib.py


*** Variables ***
${BROWSER}      firefox
${INPUT_DIR}    %{PWD}/test/robot/input
${URL}          http://127.0.0.1:3000
${DELAY}        0.1 seconds


*** Keywords ***
Open And Configure Browser
    Open Browser    ${URL}    ${BROWSER}
    Set Selenium Speed    ${DELAY}

Go To Main Page
    Go To    ${URL}

Main Page Should Be Open
    Page Should Contain    Drag and drop

Remove Test Images
    Remove File    %{UPLOAD_FOLDER}/test_*
    Remove File    %{PUBLIC_FOLDER}/test_*
