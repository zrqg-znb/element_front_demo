// 项目看板数据 - 支持多层级组织下的项目分布
const organizationData = {
    '研发中心': {
        projects: [
            { id: 'RD001', name: '企业门户网站重构' },
            { id: 'RD002', name: '内部OA系统升级' }
        ],
        departments: {
            '前端技术部': {
                projects: [
                    { id: 'FE001', name: 'UI组件库开发' },
                    { id: 'FE002', name: '性能优化方案' }
                ],
                departments: {
                    'Web团队': {
                        projects: [
                            { id: 'WEB001', name: '响应式布局重构' },
                            { id: 'WEB002', name: 'WebApp框架升级' }
                        ],
                        departments: {}
                    },
                    '移动团队': {
                        projects: [
                            { id: 'MOB001', name: 'iOS客户端V2.0' },
                            { id: 'MOB002', name: 'Android客户端V2.0' }
                        ],
                        departments: {}
                    }
                }
            },
            '后端技术部': {
                projects: [
                    { id: 'BE001', name: '微服务架构转型' },
                    { id: 'BE002', name: '数据库性能优化' }
                ],
                departments: {
                    'Java团队': {
                        projects: [
                            { id: 'JAVA001', name: 'Spring Cloud实施' },
                            { id: 'JAVA002', name: '支付系统重构' }
                        ],
                        departments: {}
                    },
                    'Python团队': {
                        projects: [
                            { id: 'PY001', name: '数据分析平台' },
                            { id: 'PY002', name: '爬虫系统优化' }
                        ],
                        departments: {}
                    }
                }
            }
        }
    },
    '产品中心': {
        projects: [
            { id: 'PM001', name: '产品路线图规划' },
            { id: 'PM002', name: '竞品分析报告' }
        ],
        departments: {
            '用户体验部': {
                projects: [
                    { id: 'UX001', name: 'UI设计规范制定' },
                    { id: 'UX002', name: '用户调研' }
                ],
                departments: {}
            },
            '产品规划部': {
                projects: [
                    { id: 'PP001', name: '新功能需求分析' },
                    { id: 'PP002', name: '产品迭代计划' }
                ],
                departments: {}
            }
        }
    },
    '运营中心': {
        projects: [
            { id: 'OP001', name: '年度运营计划' },
            { id: 'OP002', name: '用户增长策略' }
        ],
        departments: {
            '市场部': {
                projects: [
                    { id: 'MK001', name: '品牌推广活动' },
                    { id: 'MK002', name: '社交媒体运营' }
                ],
                departments: {}
            },
            '客户服务部': {
                projects: [
                    { id: 'CS001', name: '客服系统升级' },
                    { id: 'CS002', name: '满意度提升计划' }
                ],
                departments: {}
            }
        }
    }
};

class CascadeSelector {
    constructor() {
        this.selectedProjectId = null; // 存储选中的单个项目ID
        this.selectedProjectInfo = null; // 存储选中的项目信息
        this.isOpen = false;
        this.currentPath = []; // 当前浏览路径
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderLevel1();
    }

    bindEvents() {
        const dropdownHeader = document.getElementById('dropdownHeader');
        const confirmBtn = document.getElementById('confirmBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const sendRequestBtn = document.getElementById('sendRequestBtn');

        dropdownHeader.addEventListener('click', () => this.toggleDropdown());
        confirmBtn.addEventListener('click', () => this.confirmSelection());
        cancelBtn.addEventListener('click', () => this.cancelSelection());
        sendRequestBtn.addEventListener('click', () => this.sendRequest());

        // 点击外部关闭下拉框
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-container')) {
                this.closeDropdown();
            }
        });
    }

    toggleDropdown() {
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        const header = document.getElementById('dropdownHeader');
        const content = document.getElementById('dropdownContent');
        
        header.classList.add('active');
        content.classList.add('show');
        this.isOpen = true;
    }

    closeDropdown() {
        const header = document.getElementById('dropdownHeader');
        const content = document.getElementById('dropdownContent');
        
        header.classList.remove('active');
        content.classList.remove('show');
        this.isOpen = false;
    }

    renderLevel1() {
        const level1Container = document.getElementById('level1');
        level1Container.innerHTML = '';
        this.currentPath = [];

        Object.keys(organizationData).forEach(orgName => {
            const item = this.createOrganizationItem(orgName, 1, []);
            level1Container.appendChild(item);
        });
    }

    renderLevel2(selectedOrg) {
        const level2Container = document.getElementById('level2');
        const level3Container = document.getElementById('level3');
        
        level2Container.innerHTML = '';
        level3Container.innerHTML = '';
        this.currentPath = [selectedOrg];

        const orgData = this.getOrganizationData([selectedOrg]);
        if (orgData) {
            // 渲染直属项目
            if (orgData.projects && orgData.projects.length > 0) {
                orgData.projects.forEach(project => {
                    const projectItem = this.createProjectItem(project, 2, [selectedOrg]);
                    level2Container.appendChild(projectItem);
                });
            }
            
            // 渲染子组织
            if (orgData.departments) {
                Object.keys(orgData.departments).forEach(subOrg => {
                    const orgItem = this.createOrganizationItem(subOrg, 2, [selectedOrg]);
                    level2Container.appendChild(orgItem);
                });
            }
        }
    }

    renderLevel3(path) {
        const level3Container = document.getElementById('level3');
        level3Container.innerHTML = '';
        this.currentPath = [...path];

        const orgData = this.getOrganizationData(path);
        if (orgData) {
            // 渲染直属项目
            if (orgData.projects && orgData.projects.length > 0) {
                orgData.projects.forEach(project => {
                    const projectItem = this.createProjectItem(project, 3, path);
                    level3Container.appendChild(projectItem);
                });
            }
            
            // 渲染子组织
            if (orgData.departments) {
                Object.keys(orgData.departments).forEach(subOrg => {
                    const orgItem = this.createOrganizationItem(subOrg, 3, path);
                    level3Container.appendChild(orgItem);
                });
            }
        }
    }

    getOrganizationData(path) {
        let current = organizationData;
        for (const org of path) {
            if (current[org]) {
                current = current[org];
            } else if (current.departments && current.departments[org]) {
                current = current.departments[org];
            } else {
                return null;
            }
        }
        return current;
    }

    createOrganizationItem(orgName, level, parentPath) {
        const item = document.createElement('div');
        item.className = 'level-item organization-item';
        
        const fullPath = [...parentPath, orgName];
        const pathKey = fullPath.join(' > ');
        
        // 创建单选框（仅用于视觉一致性，不实际选择）
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'organization'; // 使用不同的name，避免与项目单选框冲突
        radio.id = `org-${level}-${orgName.replace(/\s/g, '-')}`;
        radio.disabled = true; // 禁用单选框，因为我们只允许选择项目
        
        const label = document.createElement('label');
        label.innerHTML = `🏢 ${orgName}`;
        label.setAttribute('for', radio.id);
        
        item.appendChild(radio);
        item.appendChild(label);

        // 点击事件处理级联展开
        const handleClick = () => {
            if (level === 1) {
                this.renderLevel2(orgName);
            } else if (level === 2) {
                this.renderLevel3([...parentPath, orgName]);
            }
        };
        
        // 为整个项目添加点击事件
        item.addEventListener('click', handleClick);
        
        // 确保点击单选框时也能触发级联展开
        radio.addEventListener('click', (e) => {
            e.preventDefault(); // 阻止单选框状态改变
            handleClick();
        });
        
        // 确保点击标签时也能触发级联展开
        label.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止冒泡，避免触发两次
            handleClick();
        });

        return item;
    }

    createProjectItem(project, level, parentPath) {
        const item = document.createElement('div');
        item.className = 'level-item project-item';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'project'; // 所有项目单选框使用相同的name
        const projectId = project.id;
        const projectName = project.name;
        
        radio.id = `project-${level}-${projectId}`;
        
        const label = document.createElement('label');
        label.innerHTML = `📊 ${projectName}`;
        label.setAttribute('for', radio.id);
        
        item.appendChild(radio);
        item.appendChild(label);

        // 检查是否已选中
        if (this.selectedProjectId === projectId) {
            radio.checked = true;
            item.classList.add('selected');
        }

        // 绑定事件
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                // 清除之前的选择
                this.clearAllSelections();
                
                // 设置新的选择
                this.selectedProjectId = projectId;
                this.selectedProjectInfo = {
                    id: projectId,
                    name: projectName,
                    path: [...parentPath]
                };
                item.classList.add('selected');
            }
        });

        return item;
    }
    
    // 清除所有选择
    clearAllSelections() {
        // 清除所有radio的选中状态
        document.querySelectorAll('input[name="project"]').forEach(radio => {
            radio.checked = false;
            radio.closest('.level-item').classList.remove('selected');
        });
        
        // 清除选中的项目ID
        this.selectedProjectId = null;
        this.selectedProjectInfo = null;
    }

    confirmSelection() {
        this.updateSelectedDisplay();
        this.closeDropdown();
    }

    cancelSelection() {
        this.closeDropdown();
    }

    updateSelectedDisplay() {
        const selectedText = document.getElementById('selectedText');
        const selectedList = document.getElementById('selectedList');
        
        if (!this.selectedProjectId) {
            selectedText.textContent = '请选择一个项目...';
            selectedList.innerHTML = '<p style="color: #999;">暂无选择的项目</p>';
        } else {
            selectedText.textContent = `已选择项目: ${this.selectedProjectInfo.name}`;
            
            selectedList.innerHTML = '';
            
            // 显示选中的项目
            const projectHeader = document.createElement('div');
            projectHeader.innerHTML = '<strong>选中的项目：</strong>';
            projectHeader.style.marginBottom = '8px';
            selectedList.appendChild(projectHeader);
            
            // 创建项目标签
            const tag = document.createElement('span');
            tag.className = 'selected-tag';
            tag.style.backgroundColor = '#3498db'; // 使用默认蓝色
            tag.innerHTML = `📊 ${this.selectedProjectInfo.name} <small>(${this.selectedProjectInfo.path.join(' > ')})</small>`;
            
            // 添加删除按钮
            const deleteBtn = document.createElement('span');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '×';
            
            // 添加点击事件
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // 阻止事件冒泡
                this.clearAllSelections();
                this.updateSelectedDisplay();
            });
            
            tag.appendChild(deleteBtn);
            selectedList.appendChild(tag);
            
            // 添加项目详情
            const details = document.createElement('div');
            details.style.marginTop = '10px';
            details.innerHTML = `
                <div><strong>项目ID:</strong> ${this.selectedProjectInfo.id}</div>
                <div><strong>所属组织:</strong> ${this.selectedProjectInfo.path.join(' > ')}</div>
            `;
            selectedList.appendChild(details);
        }
    }

    async sendRequest() {
        const resultContainer = document.getElementById('requestResult');
        
        if (!this.selectedProjectId) {
            resultContainer.textContent = '请先选择一个项目再发送请求';
            return;
        }

        resultContainer.textContent = '正在发送请求...';

        try {
            // 构建请求数据
            const requestData = {
                selectedProject: this.selectedProjectInfo,
                timestamp: new Date().toISOString()
            };

            // 这里可以替换为真实的API端点
            const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                const result = await response.json();
                resultContainer.textContent = `请求成功！\n\n发送的数据：\n${JSON.stringify(requestData, null, 2)}\n\n服务器响应：\n${JSON.stringify(result, null, 2)}`;
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            resultContainer.textContent = `请求失败：${error.message}\n\n本次发送的数据：\n${JSON.stringify({
                selectedProject: this.selectedProjectInfo,
                timestamp: new Date().toISOString()
            }, null, 2)}`;
        }
    }
}

// 初始化级联选择器
document.addEventListener('DOMContentLoaded', () => {
    new CascadeSelector();
});

// 导出供外部使用
window.CascadeSelector = CascadeSelector;