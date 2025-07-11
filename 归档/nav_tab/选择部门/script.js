document.addEventListener('DOMContentLoaded', () => {
    const customSelectWrapper = document.querySelector('.custom-select-wrapper');
    const customSelectTrigger = document.querySelector('.custom-select-trigger');
    const customOptionsContainer = document.querySelector('.custom-options-container'); // 更改了类名
    const selectedValueDisplay = document.getElementById('selected-value-display');
    const realSelect = document.getElementById('real-select'); // 真正的select元素
    const contentDisplay = document.getElementById('content-display'); // 用于显示选择内容

    // 切换下拉框的显示/隐藏
    customSelectTrigger.addEventListener('click', () => {
        customSelectWrapper.classList.toggle('active');
    });

    // 点击一级分类头，展开/收起二级选项
    customOptionsContainer.querySelectorAll('.group-header').forEach(header => {
        header.addEventListener('click', (event) => {
            const group = event.currentTarget.closest('.option-group');
            group.classList.toggle('expanded');
        });
    });

    // 点击二级选项
    customOptionsContainer.querySelectorAll('.option-item').forEach(item => {
        item.addEventListener('click', (event) => {
            const selectedValue = event.currentTarget.dataset.optionValue; // 获取data-option-value
            const selectedText = event.currentTarget.textContent;

            // 移除所有选中样式
            customOptionsContainer.querySelectorAll('.option-item').forEach(opt => {
                opt.classList.remove('selected');
            });

            // 添加当前选中样式
            event.currentTarget.classList.add('selected');

            // 更新显示值
            selectedValueDisplay.textContent = selectedText;

            // *** 核心逻辑变更：将值赋给真正的 <select> 元素 ***
            realSelect.value = selectedValue;

            handleSelectionChange(selectedValue); // 直接使用选中的值

            // 关闭下拉框
            customSelectWrapper.classList.remove('active');
        });
    });

    // 点击外部区域关闭下拉框
    document.addEventListener('click', (event) => {
        if (!customSelectWrapper.contains(event.target)) {
            customSelectWrapper.classList.remove('active');
        }
    });

    // 这个函数会接收到 realSelect.value 的值
    function handleSelectionChange(selectedValue) {
        console.log("选中的值为:", selectedValue);
        // 这里是你的原有逻辑，根据 selectedValue 查找对应 ID 的内容
        // 示例：
        if (selectedValue === "valueA1") {
            contentDisplay.textContent = "你选择了 '选项 A1'，这是对应的内容。";
        } else if (selectedValue === "valueA2") {
            contentDisplay.textContent = "你选择了 '选项 A2'，这是对应的内容。";
        } else if (selectedValue === "valueB1") {
            contentDisplay.textContent = "你选择了 '选项 B1'，这是对应的内容。";
        } else if (selectedValue === "valueB2") {
            contentDisplay.textContent = "你选择了 '选项 B2'，这是对应的内容。";
        } else if (selectedValue === "valueB3") {
            contentDisplay.textContent = "你选择了 '选项 B3'，这是对应的内容。";
        } else {
            contentDisplay.textContent = "没有找到对应 '" + selectedValue + "' 的内容。";
        }
    }

    // 初始化时，如果真正的select有默认值，则更新显示
    if (realSelect.value) {
        const initialSelectedValue = realSelect.value;
        const initialSelectedOptionItem = customOptionsContainer.querySelector(`.option-item[data-option-value="${initialSelectedValue}"]`);
        if (initialSelectedOptionItem) {
            selectedValueDisplay.textContent = initialSelectedOptionItem.textContent;
            initialSelectedOptionItem.classList.add('selected');
            // 如果默认值在某个组内，也展开该组
            const parentGroup = initialSelectedOptionItem.closest('.option-group');
            if (parentGroup) {
                parentGroup.classList.add('expanded');
            }
        }
        handleSelectionChange(initialSelectedValue);
    }

    // 添加一个监听器，确保兼容性
    realSelect.addEventListener('change', (event) => {
        handleSelectionChange(event.target.value);
    });
});